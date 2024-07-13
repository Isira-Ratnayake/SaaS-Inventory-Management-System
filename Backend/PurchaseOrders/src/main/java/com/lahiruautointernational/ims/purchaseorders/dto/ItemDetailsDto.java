package com.lahiruautointernational.ims.purchaseorders.dto;

public class ItemDetailsDto {
    private int itemId;
    private String itemName;
    private String supplier;
    private String orderQuantity;
    private String stockOnHand;
    private String maxQuantity;
    private String safetyStock;
    private String quantityOnOrder;

    public ItemDetailsDto(int itemId, String itemName, String supplier, String orderQuantity, String stockOnHand, String maxQuantity, String safetyStock, String quantityOnOrder) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.supplier = supplier;
        this.orderQuantity = orderQuantity;
        this.stockOnHand = stockOnHand;
        this.maxQuantity = maxQuantity;
        this.safetyStock = safetyStock;
        this.quantityOnOrder = quantityOnOrder;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getOrderQuantity() {
        return orderQuantity;
    }

    public void setOrderQuantity(String orderQuantity) {
        this.orderQuantity = orderQuantity;
    }

    public String getStockOnHand() {
        return stockOnHand;
    }

    public void setStockOnHand(String stockOnHand) {
        this.stockOnHand = stockOnHand;
    }

    public String getMaxQuantity() {
        return maxQuantity;
    }

    public void setMaxQuantity(String maxQuantity) {
        this.maxQuantity = maxQuantity;
    }

    public String getSafetyStock() {
        return safetyStock;
    }

    public void setSafetyStock(String safetyStock) {
        this.safetyStock = safetyStock;
    }

    public String getQuantityOnOrder() {
        return quantityOnOrder;
    }

    public void setQuantityOnOrder(String quantityOnOrder) {
        this.quantityOnOrder = quantityOnOrder;
    }
}
