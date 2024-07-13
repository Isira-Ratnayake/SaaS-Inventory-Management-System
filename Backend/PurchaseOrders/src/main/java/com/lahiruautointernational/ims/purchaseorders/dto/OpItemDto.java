package com.lahiruautointernational.ims.purchaseorders.dto;

public class OpItemDto {
    private int itemId;
    private String itemName;
    private String orderQuantity;

    public OpItemDto(int itemId, String itemName, String orderQuantity) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.orderQuantity = orderQuantity;
    }

    public OpItemDto() {
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

    public String getOrderQuantity() {
        return orderQuantity;
    }

    public void setOrderQuantity(String orderQuantity) {
        this.orderQuantity = orderQuantity;
    }
}
