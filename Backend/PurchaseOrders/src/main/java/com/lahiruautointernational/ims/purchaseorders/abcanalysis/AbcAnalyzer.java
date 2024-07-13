package com.lahiruautointernational.ims.purchaseorders.abcanalysis;

import com.lahiruautointernational.ims.purchaseorders.model.Item;
import com.lahiruautointernational.ims.purchaseorders.repository.InventoryRepository;
import com.lahiruautointernational.ims.purchaseorders.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class AbcAnalyzer {
    private Item item;
    private List<Integer> sales;
    private BigDecimal stockOnHand;
    private BigDecimal quantityOnOrder;

    private final InventoryRepository inventoryRepository;
    private final InvoiceRepository invoiceRepository;

    @Autowired
    public AbcAnalyzer(InventoryRepository inventoryRepository, InvoiceRepository invoiceRepository) {
        this.inventoryRepository = inventoryRepository;
        this.invoiceRepository = invoiceRepository;
        this.item = null;
        this.sales = null;
        this.stockOnHand = null;
        this.quantityOnOrder = null;
    }

    public void run(Item item) {
        this.item = item;
        this.sales = invoiceRepository.getPastTwelveMonthSales(item.getItemId());
        this.stockOnHand = inventoryRepository.getStockOnHand(item.getItemId());
        this.quantityOnOrder = inventoryRepository.getQuantityOnOrder(item.getItemId());
    }

    private int findTotalSales() {
        if (sales != null)
            return sales.stream().mapToInt(Integer::intValue).sum();
        return 0;
    }

    public AbcClass findAbcCategory() {
        if(findTotalSales() >= AbcParameters.MIN_LAST_12_MONTHS_SALES_CLASS_A) {
            return AbcClass.A;
        }
        else if(findTotalSales() >= AbcParameters.MIN_LAST_12_MONTHS_SALES_CLASS_B) {
            return AbcClass.B;
        }
        else {
            return AbcClass.C;
        }
    }

    public StockStatus findStockStatus() {
        if (stockOnHand != null && stockOnHand.compareTo(findMaxQuantity()) > 0) {
            return StockStatus.OVER_STOCK;
        }
        if(stockOnHand != null && stockOnHand.compareTo(findSafetyStock()) < 0) {
            return StockStatus.UNDER_STOCK;
        }
        return StockStatus.NORMAL;
    }

    private BigDecimal findForecast() {
        if(sales != null) {
            return new BigDecimal(sales.get(0)).multiply(AbcParameters.MONTH_1_WEIGHT)
                    .add(new BigDecimal(sales.get(1)).multiply(AbcParameters.MONTH_2_WEIGHT))
                    .add(new BigDecimal(sales.get(2)).multiply(AbcParameters.MONTH_3_WEIGHT))
                    .add(new BigDecimal(sales.get(3)).multiply(AbcParameters.MONTH_4_WEIGHT));
        }
        return new BigDecimal("0");
    }

    public BigDecimal findMinQuantity() {
        return AbcParameters.MIN_RANGE_MONTHS.multiply(findForecast()).setScale(0, RoundingMode.HALF_EVEN);
    }

    public BigDecimal findMaxQuantity() {
        return AbcParameters.MAX_RANGE_MONTHS.multiply(findForecast()).setScale(0, RoundingMode.HALF_EVEN);
    }
    public BigDecimal findSafetyStock() {
        return AbcParameters.SAFETY_STOCK_MONTHS.multiply(findForecast()).setScale(0, RoundingMode.HALF_EVEN);
    }

    public BigDecimal findTotalStock() {
        if(this.stockOnHand != null && this.quantityOnOrder != null)
            return this.stockOnHand.add(this.quantityOnOrder);
        return new BigDecimal("0");
    }

    public BigDecimal findOrderProposal() {
        if(findTotalStock().compareTo(findMinQuantity()) <= 0) {
            return findMaxQuantity().subtract(findTotalStock());
        }
        return new BigDecimal("0");
    }

    public Item getItem() {
        return item;
    }

    public List<Integer> getSales() {
        return sales;
    }

    public BigDecimal getStockOnHand() {
        return stockOnHand;
    }

    public BigDecimal getQuantityOnOrder() {
        return quantityOnOrder;
    }
}
