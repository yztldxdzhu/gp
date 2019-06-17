package com.thinker.domain;

/**
 * 地址
 * Created by LJ on 2017/5/11.
 */
public class Address {

    private int addressId;

    private String addressArea;   //地址所在区

    private String addressDetail;  //详细地址

    private String addressPostcode;  //邮政编码

    private String addressReceivingname;  //收货地址

    private String addressPhone;  //电话

    private int addressIsdefault;  //是否是默认地址，0不是，1表示是默认地址

    private int userId;

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }

    public String getAddressArea() {
        return addressArea;
    }

    public void setAddressArea(String addressArea) {
        this.addressArea = addressArea;
    }

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public String getAddressPostcode() {
        return addressPostcode;
    }

    public void setAddressPostcode(String addressPostcode) {
        this.addressPostcode = addressPostcode;
    }

    public String getAddressReceivingname() {
        return addressReceivingname;
    }

    public void setAddressReceivingname(String addressReceivingname) {
        this.addressReceivingname = addressReceivingname;
    }

    public String getAddressPhone() {
        return addressPhone;
    }

    public void setAddressPhone(String addressPhone) {
        this.addressPhone = addressPhone;
    }

    public int getAddressIsdefault() {
        return addressIsdefault;
    }

    public void setAddressIsdefault(int addressIsdefault) {
        this.addressIsdefault = addressIsdefault;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
