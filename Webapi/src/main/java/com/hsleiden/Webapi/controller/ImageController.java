package com.hsleiden.Webapi.controller;

import com.cloudinary.Cloudinary;
import com.hsleiden.Webapi.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return "Please select a file to upload.";
        }



        try {
            // Convert MultipartFile to byte array
            byte[] imageData = file.getBytes();

            // TODO fix de naam van de image die wordt opgestuurd.
            // Generate a unique filename (you might want to implement a more robust strategy)
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String filename = originalFilename + System.currentTimeMillis() + extension;

            // Upload the image to Cloudinary
            String imageUrl = cloudinaryService.uploadImage(imageData, filename);

            return "Image uploaded successfully. Public URL: " + imageUrl;
        } catch (IOException e) {
            return "Error uploading the image: " + e.getMessage();
        }
    }
}

