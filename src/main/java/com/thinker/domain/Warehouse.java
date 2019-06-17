package com.thinker.domain;

/**
 * Created by LJ on 2017/6/5.
 */
public class Warehouse {

    private int warehouseId;   //工厂ID

    private String warehouseName;   //工厂名称

    private String warehouseType;   //工厂类型

    public int getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(int warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public String getWarehouseType() {
        return warehouseType;
    }

    public void setWarehouseType(String warehouseType) {
        this.warehouseType = warehouseType;
    }
}
