package com.thinker.serviceImpl;

import com.thinker.domain.Address;
import com.thinker.mapper.AddressMapper;
import com.thinker.service.AddressService;
import com.thinker.util.JDBCUtil.AddressJDBC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/5/12.
 */
@Component
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressMapper addressMapper;

    //添加地址
    @Override
    public boolean addAddress(Address address){
        boolean flag = true;
        if(address.getAddressIsdefault() == 1){
            try {
                AddressJDBC addressJDBC = (AddressJDBC)Class.forName("com.thinker.util.JDBCUtil.AddressJDBC").newInstance();
                flag = addressJDBC.insertAddress(address);
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }else{
            addressMapper.insertAddress(address);
        }
        return flag;
    }

    //更新地址
    @Override
    public void updateAddress(Address address){
        addressMapper.updateAddress(address);
    }

    //查找地址
    @Override
    public Address selectAddressBYAddressId(int addressId){
        return addressMapper.selectAddressBYAddressId(addressId);
    }

    //查找用户所有地址
    @Override
    public List<Address> selectAllAddressByUserId(int userId){
        return addressMapper.selectAllAddressByUserId(userId);
    }

    //删除地址
    @Override
    public void deleteAddressByAddressId(int addressId){
        addressMapper.deleteAddressByAddressId(addressId);
    }
}
