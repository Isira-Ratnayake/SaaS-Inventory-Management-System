package com.lahiruautointernational.ims.purchaseorders.repository;

import com.lahiruautointernational.ims.purchaseorders.dto.OpItemDto;
import com.lahiruautointernational.ims.purchaseorders.dto.PoDto;
import com.lahiruautointernational.ims.purchaseorders.model.Item;
import com.lahiruautointernational.ims.purchaseorders.model.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
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

    public Integer getNextPoNumber() {
        Integer i = jdbc.queryForObject(
                "select (pos+1) as 'next_po_number' from company_sequence where company_id = 1;",
                this::mapRowToNextPoNumber
        );
        if(i != null ){
            return i;
        }
        return -1;
    }

    public void insertPon(int supplierId, List<OpItemDto> opItemDtos) {
        try {
            jdbc.execute("insert into po values (?, current_date, ?, 0, 0, 100, 1, 1)",
                    (PreparedStatementCallback<Boolean>) preparedStatement -> {
                        preparedStatement.setInt(1, getNextPoNumber());
                        preparedStatement.setInt(2, supplierId);
                        return preparedStatement.execute();
                    } );
            for(OpItemDto opItemDto : opItemDtos) {
                jdbc.execute("insert into po_items values (?, ?, ?)",
                        (PreparedStatementCallback<Boolean>) preparedStatement -> {
                            preparedStatement.setInt(1, getNextPoNumber());
                            preparedStatement.setInt(2, opItemDto.getItemId());
                            preparedStatement.setBigDecimal(3, new BigDecimal(opItemDto.getOrderQuantity()));
                            return preparedStatement.execute();
                        } );
            }
            jdbc.execute("update company_sequence set pos=pos+1 where company_id = 1",
                    (PreparedStatementCallback<Boolean>) PreparedStatement::execute);
        }
        catch(DataAccessException e) {
        }
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

    public List<PoDto> getPos() {
        List<PoDto> poDtos = jdbc.query("select * from po;",
        this::mapRowToPo);
        for(PoDto poDto : poDtos) {
            List<OpItemDto> opItemDtos = jdbc.query("select * from po_items where po_number = ?;", this::mapRowToOpItem, poDto.getPoNumber());
            for(OpItemDto opItemDto : opItemDtos) {
                opItemDto.setItemName(getItemByItemId(opItemDto.getItemId()).getItemName());
            }
            poDto.setItems(opItemDtos);
        }
        return poDtos;
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

    private Integer mapRowToNextPoNumber(ResultSet resultSet, int rowNum) throws SQLException {
        return resultSet.getInt("next_po_number");
    }


    private BigDecimal mapRowToSoh(ResultSet resultSet, int rowNum) throws SQLException {
        return resultSet.getBigDecimal("stock_on_hand");
    }
    private BigDecimal mapRowToQoo(ResultSet resultSet, int rowNum) throws SQLException {
        return resultSet.getBigDecimal("quantity_on_order");
    }

    private PoDto mapRowToPo(ResultSet resultSet, int rowNum) throws SQLException {
        return new PoDto(
                resultSet.getInt("po_number"),
                resultSet.getString("po_date"),
                resultSet.getInt("supplier_id"),
                resultSet.getBoolean("is_canceled"),
                resultSet.getBoolean("is_fulfilled"),
                resultSet.getInt("action_user_id"),
                null
        );
    }

    private OpItemDto mapRowToOpItem(ResultSet resultSet, int rowNum) throws SQLException {
        return new OpItemDto(
                resultSet.getInt("item_id"),
                null,
                resultSet.getBigDecimal("quantity").toPlainString()
        );
    }
}
