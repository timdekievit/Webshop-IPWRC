package com.hsleiden.Webapi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(byte[] imageData, String filename) throws IOException {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(imageData, ObjectUtils.asMap("public_id", filename));
        return uploadResult.get("url").toString();
    }
}
