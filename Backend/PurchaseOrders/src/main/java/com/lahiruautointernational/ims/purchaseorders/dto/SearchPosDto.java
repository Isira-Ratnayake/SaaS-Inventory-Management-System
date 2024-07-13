package com.lahiruautointernational.ims.purchaseorders.dto;

import com.lahiruautointernational.ims.purchaseorders.model.Supplier;

import java.util.List;

public class SearchPosDto {
    private List<Supplier> supplier;

    public SearchPosDto(List<Supplier> supplier) {
        this.supplier = supplier;
    }

    public List<Supplier> getSupplier() {
        return supplier;
    }

    public void setSupplier(List<Supplier> supplier) {
        this.supplier = supplier;
    }
}
