package com.thinker.mapper;

import com.thinker.domain.Address;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/5/12.
 */
@Component
public interface AddressMapper {

    void insertAddress(Address address);

    Address selectAddressBYAddressId(int addressId);

    List<Address> selectAllAddressByUserId(int userId);

    void updateAddress(Address address);

    void deleteAddressByAddressId(int addressId);

}
