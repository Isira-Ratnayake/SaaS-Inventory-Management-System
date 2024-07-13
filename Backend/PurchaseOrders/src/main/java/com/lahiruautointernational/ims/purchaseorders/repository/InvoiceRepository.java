package com.lahiruautointernational.ims.purchaseorders.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class InvoiceRepository {
    private final JdbcTemplate jdbc;

    @Autowired
    public InvoiceRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Integer> getPastTwelveMonthSales(int itemId) {
        List<Integer> sales;

        try {
            sales = jdbc.query(
                    "call getPastTwelveMonthSales(?)",
                    this::mapRowToSales,
                    itemId
            );
        }
        catch (Exception e) {
            sales = new ArrayList<>();
        }

        if(sales.size() < 12) {
            for(int i=sales.size(); i<12; i++) {
                sales.add(0);
            }
        }

        return sales;
    }

    private Integer mapRowToSales(ResultSet resultSet, int rowNum) throws SQLException {
        return resultSet.getInt("no_of_sales");
    }

}
