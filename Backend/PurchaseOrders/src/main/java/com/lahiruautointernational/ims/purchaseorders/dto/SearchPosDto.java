package com.lahiruautointernational.ims.purchaseorders.dto;

import com.lahiruautointernational.ims.purchaseorders.model.Supplier;

import java.util.List;

public class SearchPosDto {
    private List<Supplier> supplier;
    private List<PoDto> poDtos;

    public SearchPosDto(List<Supplier> supplier, List<PoDto> poDtos) {
        this.supplier = supplier;
        this.poDtos = poDtos;
    }

    public List<Supplier> getSupplier() {
        return supplier;
    }

    public void setSupplier(List<Supplier> supplier) {
        this.supplier = supplier;
    }

    public List<PoDto> getPoDtos() {
        return poDtos;
    }

    public void setPoDtos(List<PoDto> poDtos) {
        this.poDtos = poDtos;
    }
}
