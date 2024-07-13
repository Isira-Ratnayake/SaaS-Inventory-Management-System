package com.lahiruautointernational.ims.purchaseorders.service;

import com.lahiruautointernational.ims.purchaseorders.abcanalysis.AbcAnalyzer;
import com.lahiruautointernational.ims.purchaseorders.dto.ItemDetailsDto;
import com.lahiruautointernational.ims.purchaseorders.dto.OpItemDto;
import com.lahiruautointernational.ims.purchaseorders.dto.SearchPosDto;
import com.lahiruautointernational.ims.purchaseorders.model.Item;
import com.lahiruautointernational.ims.purchaseorders.model.Supplier;
import com.lahiruautointernational.ims.purchaseorders.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PosService {
    private final InventoryRepository inventoryRepository;
    private final AbcAnalyzer abcAnalyzer;

    @Autowired
    public PosService(InventoryRepository inventoryRepository, AbcAnalyzer abcAnalyzer) {
        this.inventoryRepository = inventoryRepository;
        this.abcAnalyzer = abcAnalyzer;
    }

    public SearchPosDto searchPos() {
        return new SearchPosDto(
                inventoryRepository.getSuppliers()
        );
    }

    public List<OpItemDto> getPoProposedItems(int supplierId) {
        List<Item> items = inventoryRepository.getItemsBySupplierId(supplierId);
        List<OpItemDto> opItems = new ArrayList<>();
        for(Item item : items) {
            abcAnalyzer.run(item);
            BigDecimal op = abcAnalyzer.findOrderProposal();
            if(op.compareTo(new BigDecimal("0")) > 0) {
                opItems.add(
                        new OpItemDto(
                                item.getItemId(),
                                item.getItemName(),
                                op.toPlainString()
                        )
                );
            }
        }
        return opItems;
    }

    public List<Supplier> getSupplierItemList(int supplierId) {
        List<Supplier> itemList = new ArrayList<>();
        List<Item> items = inventoryRepository.getItemsBySupplierId(supplierId);
        for(Item item : items) {
            itemList.add(new Supplier(item.getItemId(), item.getItemName()));
        }
        return itemList;
    }

    public ItemDetailsDto getItemDetails(int itemId) {
        Item item = inventoryRepository.getItemByItemId(itemId);
        Supplier supplier = inventoryRepository.getSupplierBySupplierId(item.getSupplierId());
        abcAnalyzer.run(item);
        return new ItemDetailsDto(
                item.getItemId(),
                item.getItemName(),
                supplier.getDescription(),
                null,
                abcAnalyzer.getStockOnHand().toPlainString(),
                abcAnalyzer.findMaxQuantity().toPlainString(),
                abcAnalyzer.findSafetyStock().toPlainString(),
                abcAnalyzer.getQuantityOnOrder().toPlainString()
        );
    }
}
