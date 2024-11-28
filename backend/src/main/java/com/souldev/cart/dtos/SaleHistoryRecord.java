package com.souldev.cart.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;


@AllArgsConstructor
public class SaleHistoryRecord {
    @Getter
    private String customerEmail;
    @Getter
    private double subtotal;
    @Getter
    private Date date;

}
