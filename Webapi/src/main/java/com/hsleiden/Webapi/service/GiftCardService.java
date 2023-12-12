package com.hsleiden.Webapi.service;

import com.hsleiden.Webapi.model.GiftCard;
import com.hsleiden.Webapi.repository.GiftCardRepository;
import org.springframework.stereotype.Service;

@Service
public class GiftCardService {

    private final GiftCardRepository giftCardRepository;

    public GiftCardService(GiftCardRepository giftCardRepository) {
        this.giftCardRepository = giftCardRepository;
    }

    public GiftCard getGiftCard(String id) {
        return giftCardRepository.findById(id).orElse(null);
    }
}
