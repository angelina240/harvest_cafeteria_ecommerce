package com.souldev.cart.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class SaleItem {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Getter @Setter
    private String id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @Getter @Setter
    private Product product;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @Getter @Setter
    private Sale sale;

    @NotNull
    @Getter @Setter
    private int amount; // Cantidad de producto comprado
}

