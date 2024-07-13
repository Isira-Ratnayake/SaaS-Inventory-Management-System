package com.lahiruautointernational.ims.purchaseorders.model;

public class Item {
    private int itemId;
    private String itemName;
    private int supplierId;

    public Item(int itemId, String itemName, int supplierId) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.supplierId = supplierId;
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

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }
}
