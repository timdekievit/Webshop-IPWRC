package com.hsleiden.Webapi.service;

import com.cloudinary.Cloudinary;
import com.hsleiden.Webapi.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private CloudinaryService cloudinaryService;

    public String uploadImage(MultipartFile file) throws IOException {
        // Add your upload logic here
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

    public ResponseEntity<byte[]> getImage(String publicId) {
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

    public String getPublicId(String imageUrl) {
        // get the public ID from the image URL
        String[] parts = imageUrl.split("/");
        String publicIdWithExtension = parts[parts.length - 1];
        String[] publicIdParts = publicIdWithExtension.split("\\.");
        return publicIdParts[0];
    }
}