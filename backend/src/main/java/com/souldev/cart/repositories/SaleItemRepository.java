package com.souldev.cart.repositories;

import com.souldev.cart.entities.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleItemRepository extends JpaRepository<SaleItem, String> {
    // Aquí puedes agregar consultas personalizadas si es necesario.
}
