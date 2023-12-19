package com.hsleiden.Webapi.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class userUpdateRequest {
        private String email;
        private String name;
        private String address;
        private String city;
        private String zipCode;
}
