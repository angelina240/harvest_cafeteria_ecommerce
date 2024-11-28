package com.souldev.cart.controllers;

import com.souldev.cart.dtos.SaleFullDetail;
import com.souldev.cart.dtos.SaleFullDetailItem;
import com.souldev.cart.entities.Detail;
import com.souldev.cart.entities.Product;
import com.souldev.cart.services.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/saleDetail")
public class DetailController {

    private final DetailService detailService;

    @Autowired
    public DetailController(DetailService detailService) {
        this.detailService = detailService;
    }
    @GetMapping("/{sale_id}")
    public ResponseEntity<SaleFullDetail> getDetailsBySale(@PathVariable("sale_id")String id) {
        List<Detail> detailList = this.detailService.getDetailBySale(id);
        List<SaleFullDetailItem> items = new ArrayList<>();
        double total = 0;
        for (Detail detailItem : detailList) {
            Product product = detailItem.getProduct();
            SaleFullDetailItem saleFullDetailItem = new SaleFullDetailItem(
                    product.getName(),
                    detailItem.getAmount(),
                    product.getPrice(),
                    product.getPrice() * detailItem.getAmount()
            );
            items.add(
                saleFullDetailItem
            );
            total += saleFullDetailItem.getSubtotal();
        }
        SaleFullDetail saleFullDetail = new SaleFullDetail(
            items, total
        );
        return new ResponseEntity<>(saleFullDetail, HttpStatus.OK);
    }
}
