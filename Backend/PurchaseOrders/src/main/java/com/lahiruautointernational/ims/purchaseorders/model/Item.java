package com.lahiruautointernational.ims.purchaseorders;

public class Item {
    private int itemId;
    private String itemName;
    private String supplierId;

    public Item(int itemId, String itemName, String supplierId) {
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

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }
}
