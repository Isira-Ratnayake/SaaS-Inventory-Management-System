package com.lahiruautointernational.ims.purchaseorders.dto;

import java.util.List;

public class PoDto {
    private int poNumber;
    private String poDate;
    private int supplierId;
    private boolean canceled;
    private boolean fullFilled;
    private int actionUserId;
    private List<OpItemDto> items;

    public PoDto(int poNumber, String poDate, int supplierId, boolean canceled, boolean fullFilled, int actionUserId, List<OpItemDto> items) {
        this.poNumber = poNumber;
        this.poDate = poDate;
        this.supplierId = supplierId;
        this.canceled = canceled;
        this.fullFilled = fullFilled;
        this.actionUserId = actionUserId;
        this.items = items;
    }

    public int getPoNumber() {
        return poNumber;
    }

    public void setPoNumber(int poNumber) {
        this.poNumber = poNumber;
    }

    public String getPoDate() {
        return poDate;
    }

    public void setPoDate(String poDate) {
        this.poDate = poDate;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public boolean isCanceled() {
        return canceled;
    }

    public void setCanceled(boolean canceled) {
        this.canceled = canceled;
    }

    public boolean isFullFilled() {
        return fullFilled;
    }

    public void setFullFilled(boolean fullFilled) {
        this.fullFilled = fullFilled;
    }

    public int getActionUserId() {
        return actionUserId;
    }

    public void setActionUserId(int actionUserId) {
        this.actionUserId = actionUserId;
    }

    public List<OpItemDto> getItems() {
        return items;
    }

    public void setItems(List<OpItemDto> items) {
        this.items = items;
    }
}
