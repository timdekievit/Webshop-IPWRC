package com.hsleiden.Webapi.response;

import com.hsleiden.Webapi.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String id;
    private String email;
    private Role role;
    private String name;
    private String address;
    private String city;
    private String zipCode;
}
