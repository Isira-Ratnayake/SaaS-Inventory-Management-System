package com.lahiruautointernational.ims.purchaseorders.abcanalysis;

import java.math.BigDecimal;

public final class AbcParameters {
    public static int MIN_LAST_12_MONTHS_SALES_CLASS_A = 24;
    public static int MIN_LAST_12_MONTHS_SALES_CLASS_B = 3;
    public static int MIN_LAST_12_MONTHS_SALES_CLASS_C = 0;
    public static BigDecimal MONTH_1_WEIGHT = new BigDecimal("0.3");
    public static BigDecimal MONTH_2_WEIGHT = new BigDecimal("0.3");
    public static BigDecimal MONTH_3_WEIGHT = new BigDecimal("0.2");
    public static BigDecimal MONTH_4_WEIGHT = new BigDecimal("0.2");
    public static BigDecimal MIN_RANGE_MONTHS = new BigDecimal("4.0");
    public static BigDecimal MAX_RANGE_MONTHS = new BigDecimal("6.0");
    public static BigDecimal SAFETY_STOCK_MONTHS = new BigDecimal("2.0");

}
