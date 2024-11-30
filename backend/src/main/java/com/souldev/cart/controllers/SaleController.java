package com.souldev.cart.controllers;

import com.souldev.cart.dtos.SaleHistoryRecord;
import com.souldev.cart.entities.Sale;
import com.souldev.cart.services.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/sale")
public class SaleController {

    private final SaleService saleService;

    @Autowired
    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    // Endpoint para obtener las ventas de un cliente con los productos comprados
    @GetMapping("/client")
    public ResponseEntity<List<Sale>> getSalesByClient() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userName = userDetails.getUsername();
        return new ResponseEntity<>(this.saleService.getSalesByClient(userName), HttpStatus.OK);
    }

    // Endpoint para crear una venta
    @PostMapping(path = "/create")
    public ResponseEntity<String> createSale() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userName = userDetails.getUsername();
        this.saleService.createSale(userName);
        return new ResponseEntity<>("Compra exitosa", HttpStatus.OK);
    }

    @GetMapping("/history")
    public ResponseEntity<List<SaleHistoryRecord>> getSaleHistory() {
        List<Sale> sales = this.saleService.getSales();
        List<SaleHistoryRecord> saleHistory = new ArrayList<>();

        for (Sale sale : sales) {
            SaleHistoryRecord saleHistoryRecord = new SaleHistoryRecord(
                    sale.getClient().getEmail(),
                    sale.getTotal(),
                    sale.getDate()
            );
            saleHistory.add(saleHistoryRecord);
        }

        return new ResponseEntity<>(saleHistory, HttpStatus.OK);
    }

}
