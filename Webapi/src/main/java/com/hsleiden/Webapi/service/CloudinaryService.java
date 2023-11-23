package com.hsleiden.Webapi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(byte[] imageData, String filename) throws IOException {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(imageData, ObjectUtils.asMap("public_id", filename));
        return uploadResult.get("url").toString();
    }

    public String constructImageUrl(String publicId) {
        // Construct the Cloudinary URL based on the public ID
        return cloudinary.url().generate(publicId);
    }

    public byte[] getImage(String imageUrl) throws IOException {
        // Retrieve the image bytes from the Cloudinary URL
        try (InputStream inputStream = new URL(imageUrl).openStream()) {
            return IOUtils.toByteArray(inputStream);
        }
    }
}
