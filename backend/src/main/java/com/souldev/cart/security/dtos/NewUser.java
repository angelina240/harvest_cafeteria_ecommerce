package com.souldev.cart.security.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class NewUser {
    @NotBlank
    @Getter
    private String userName;
    @Getter
    @Email
    private String email;
    @Getter
    @NotBlank
    private String password;
    @JsonIgnore
    private boolean isAdmin;
    public NewUser(@NotBlank String userName, @Email String email, @NotBlank String password, boolean isAdmin) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
    @JsonProperty("isAdmin")
    public boolean isAdmin() {
        return isAdmin;
    }
}
