package com.hsleiden.Webapi.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private Cloudinary cloudinary;

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return "Please select a file to upload.";
        }

        try {
            // Convert MultipartFile to byte array
            byte[] imageData = file.getBytes();

            // Generate a unique filename (you might want to implement a more robust strategy)
            String filename = "image_" + System.currentTimeMillis();

            // Upload the image to Cloudinary
            Map<?, ?> uploadResult = cloudinary.uploader().upload(imageData, ObjectUtils.asMap("public_id", filename));

            // Retrieve the public URL of the uploaded image
            String imageUrl = uploadResult.get("url").toString();

            return "Image uploaded successfully. Public URL: " + imageUrl;
        } catch (IOException e) {
            return "Error uploading the image: " + e.getMessage();
        }
    }
}

