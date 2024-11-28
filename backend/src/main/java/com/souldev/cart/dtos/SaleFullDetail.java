package com.souldev.cart.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
public class SaleFullDetail {
    @Getter
    private List<SaleFullDetailItem> items;
    @Getter
    private double total;
}
