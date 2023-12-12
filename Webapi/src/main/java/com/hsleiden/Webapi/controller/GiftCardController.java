package com.hsleiden.Webapi.controller;

import com.hsleiden.Webapi.model.GiftCard;
import com.hsleiden.Webapi.service.GiftCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/giftcards")
public class GiftCardController {

    private final GiftCardService giftCardService;

    @Autowired
    public GiftCardController(GiftCardService giftCardService) {
        this.giftCardService = giftCardService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GiftCard> getGiftCard(@PathVariable String id) {
        GiftCard giftCard = giftCardService.getGiftCard(id);
        if (giftCard != null) {
            return ResponseEntity.ok(giftCard);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}