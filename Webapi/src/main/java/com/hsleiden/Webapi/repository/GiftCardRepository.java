package com.hsleiden.Webapi.repository;

import com.hsleiden.Webapi.model.GiftCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GiftCardRepository extends JpaRepository<GiftCard, String> {
}
