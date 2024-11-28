package com.souldev.cart.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class SaleFullDetailItem {
    @Getter
    private String product;
    @Getter
    private int quantity;
    @Getter
    private double unitPrice;
    @Getter
    private double subtotal;
}
