package com.thinker.service;

import com.thinker.domain.Address;

import java.util.List;

/**
 * Created by LJ on 2017/5/12.
 */
public interface AddressService {

    boolean addAddress(Address address);

    void updateAddress(Address address);

    Address selectAddressBYAddressId(int addressId);

    List<Address> selectAllAddressByUserId(int userId);

    void deleteAddressByAddressId(int addressId);


}
