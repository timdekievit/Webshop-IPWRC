package com.hsleiden.Webapi.controller;

import com.cloudinary.Cloudinary;
import com.hsleiden.Webapi.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

            String originalFilename = file.getOriginalFilename();
            String filename= originalFilename.replaceFirst("[.][^.]+$", "") + "_" + System.currentTimeMillis();

            // Upload the image to Cloudinary
            String imageUrl = cloudinaryService.uploadImage(imageData, filename);

            return "Image uploaded successfully. Public URL: " + imageUrl;
        } catch (IOException e) {
            return "Error uploading the image: " + e.getMessage();
        }
    }

    @GetMapping("/{publicId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String publicId) {
        try {
            // Construct the URL of the image based on the public ID
            String imageUrl = cloudinaryService.constructImageUrl(publicId);

            // Retrieve the image bytes from Cloudinary
            byte[] imageBytes = cloudinaryService.getImage(imageUrl);

            HttpHeaders headers = new HttpHeaders();
            headers.setCacheControl("no-cache, no-store, must-revalidate");
            headers.setPragma("no-cache");
            headers.setExpires(0);

            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(("Error retrieving the image: " + e.getMessage()).getBytes());
        }
    }
}

