package com.lahiruautointernational.ims.purchaseorders.repository;

import com.lahiruautointernational.ims.purchaseorders.model.Item;
import com.lahiruautointernational.ims.purchaseorders.model.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class InventoryRepository {
    private final JdbcTemplate jdbc;
    @Autowired
    public InventoryRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public BigDecimal getStockOnHand(int itemId) {
        BigDecimal i = jdbc.queryForObject(
                "call getStockOnHand(?);",
                this::mapRowToSoh,
                itemId
        );
        if(i != null ){
            return i;
        }
        return new BigDecimal(0);
    }

    public BigDecimal getQuantityOnOrder(int itemId) {
        BigDecimal i = jdbc.queryForObject(
                "call getQuantityOnOrder(?)",
                this::mapRowToQoo,
                itemId
        );
        if(i != null ){
            return i;
        }
        return new BigDecimal(0);
    }

    public List<Supplier> getSuppliers() {
        return jdbc.query(
                "select * from supplier;",
                this::mapRowToSupplier
        );
    }

    public List<Item> getItemsBySupplierId(int supplierId) {
        return jdbc.query(
                "select * from item where supplier_id = ?;",
                this::mapRowToItem,
                supplierId
        );
    }

    public Item getItemByItemId(int itemId) {
        return jdbc.queryForObject(
                "select * from item where item_id = ?",
                this::mapRowToItem,
                itemId
        );
    }

    public Supplier getSupplierBySupplierId(int supplierId) {
        return jdbc.queryForObject(
                "select * from supplier where supplier_id = ?",
                this::mapRowToSupplier,
                supplierId
        );
    }

    private Supplier mapRowToSupplier(ResultSet resultSet, int rowNum) throws SQLException {
        return new Supplier(
                resultSet.getInt("supplier_id"),
                resultSet.getString("supplier_name")
        );
    }

    private Item mapRowToItem(ResultSet resultSet, int rowNum) throws SQLException {
        return new Item(
                resultSet.getInt("item_id"),
                resultSet.getString("item_name"),
                resultSet.getInt("supplier_id")
        );
    }


    private BigDecimal mapRowToSoh(ResultSet resultSet, int rowNum) throws SQLException {
        return resultSet.getBigDecimal("stock_on_hand");
    }
    private BigDecimal mapRowToQoo(ResultSet resultSet, int rowNum) throws SQLException {
        return resultSet.getBigDecimal("quantity_on_order");
    }
}
