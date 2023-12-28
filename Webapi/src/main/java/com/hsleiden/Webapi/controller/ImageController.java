package com.hsleiden.Webapi.controller;

import com.hsleiden.Webapi.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return imageService.uploadImage(file);
    }

    @GetMapping("/{publicId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String publicId) {
        return imageService.getImage(publicId);
    }
}