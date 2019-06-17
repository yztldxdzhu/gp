package com.thinker.controller;

import com.thinker.domain.Address;
import com.thinker.service.AddressService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.user.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 地址管理
 * Created by LJ on 2017/5/12.
 */
@Controller
@RequestMapping(value="/address")
public class AddressController extends BaseController {

    @Autowired
    private AddressService addressService;

    //地址添加
    @RequestMapping(value="/addAddress")
    @ResponseBody
    public Map<String,Object> addAddress(@ModelAttribute Address address){
        int userId = SessionUtil.getCurrentUser().getUserId();
        address.setUserId(userId);
        boolean flag = addressService.addAddress(address);
        if(flag){
            return generateSuccessMsg("地址添加成功！");
        }else{
            return generateSuccessMsg("地址添加失败！");
        }
    }

    //更新地址
    @RequestMapping(value="/updateAddress")
    @ResponseBody
    public Map<String,Object> updateAddress(@ModelAttribute Address address){
        addressService.updateAddress(address);
        return generateSuccessMsg("地址更新成功！");
    }

    //根据addressID选择地址
    @RequestMapping(value="/selectAddressBYAddressId")
    @ResponseBody
    public Map<String,Object> selectAddressBYAddressId(@RequestParam(value="addressId") Integer addressId){
        Address address = addressService.selectAddressBYAddressId(addressId);
        return MsgGenerate.bindMapMsg("address",address);
    }

    //根据用户ID选择所有的地址
    @RequestMapping(value="/selectAllAddress")
    @ResponseBody
    public Map<String,Object> selectAllAddressByUserId(){
        int userId = SessionUtil.getCurrentUser().getUserId();
        List<Address> addressList = addressService.selectAllAddressByUserId(userId);
        return MsgGenerate.bindMapMsg("addressList",addressList);
    }

    //删除地址
    @RequestMapping(value="/deleteAddressByAddressId")
    @ResponseBody
    public Map<String,Object> deleteAddressByAddressId(@RequestParam(value="addressId") Integer addressId){
        addressService.deleteAddressByAddressId(addressId);
        return generateSuccessMsg("地址删除成功！");
    }
}
