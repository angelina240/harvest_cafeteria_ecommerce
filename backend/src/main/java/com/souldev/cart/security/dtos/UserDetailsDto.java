package com.souldev.cart.security.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class UserDetailsDto {
    @Getter
    private String id;
    @JsonIgnore
    private boolean isAdmin;
    @JsonProperty("isAdmin")
    public boolean isAdmin() {
        return isAdmin;
    }
}
