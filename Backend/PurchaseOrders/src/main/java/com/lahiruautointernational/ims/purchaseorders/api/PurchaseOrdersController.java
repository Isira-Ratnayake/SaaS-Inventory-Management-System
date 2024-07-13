package com.lahiruautointernational.ims.purchaseorders.api;

import com.lahiruautointernational.ims.purchaseorders.dto.ItemDetailsDto;
import com.lahiruautointernational.ims.purchaseorders.dto.OpItemDto;
import com.lahiruautointernational.ims.purchaseorders.dto.SearchPosDto;
import com.lahiruautointernational.ims.purchaseorders.model.Supplier;
import com.lahiruautointernational.ims.purchaseorders.service.PosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pos")
public class PurchaseOrdersController {
    private final PosService posService;

    @Autowired
    public PurchaseOrdersController(PosService posService) {
        this.posService = posService;
    }

    @GetMapping("search-pos")
    public SearchPosDto searchPosHandler(
            @RequestParam("searchBy") String searchBy,
            @RequestParam("searchValue") String searchValue,
            @RequestParam("page")  String page,
            @RequestParam("sortType") String sortType,
            @RequestParam("sortOrder") String sortOrder,
            @RequestParam("locationId") String locationId,
            @RequestParam("filterValue") String filterValue)
    {
        return posService.searchPos();
    }

    @GetMapping("get-po-proposed-items")
    public List<OpItemDto> getPoProposedItemsHandler(
            @RequestParam("supplierId") String supplierId
    )
    {
        return posService.getPoProposedItems(Integer.parseInt(supplierId));
    }

    @GetMapping("get-supplier-items")
    public List<Supplier> getSupplierItemList(
            @RequestParam("supplierId") String supplierId
            ) {
        return posService.getSupplierItemList(Integer.parseInt(supplierId));
    }

    @GetMapping("get-item-details")
    public ItemDetailsDto getItemDetails(
            @RequestParam("itemId") String itemId
    ) {
        return posService.getItemDetails(Integer.parseInt(itemId));
    }

}
