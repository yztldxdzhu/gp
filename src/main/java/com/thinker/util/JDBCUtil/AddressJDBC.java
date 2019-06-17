package com.thinker.util.JDBCUtil;

import com.thinker.domain.Address;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by LJ on 2017/5/12.
 */
public class AddressJDBC {

    //添加地址sql语句
    public static final String INSERTADDRESSSQL = "insert into address (address_area, address_detail,address_postcode,address_receivingname,address_phone,address_isdefault,user_id) values ";

    //修改默认地址sql语句
    public static final String UPDATEISDEFAULTSQL = "update address set address_isdefault = 0 ";

    public static boolean insertAddress(Address address){
        Connection conn = null;
        Statement stam = null;
        String insertSql = INSERTADDRESSSQL+"('"+address.getAddressArea()+"','"+address.getAddressDetail()+"','"+address.getAddressPostcode()+"','"+address.getAddressReceivingname()+"','"+address.getAddressPhone()+"',"+address.getAddressIsdefault()+","+address.getUserId()+")";
        String updateIsdefault = UPDATEISDEFAULTSQL+" where "+"address_isdefault = "+address.getAddressIsdefault()+" and"+" user_id = "+address.getUserId();
        try {
            JDBCConnection jdbcConnection = (JDBCConnection)Class.forName("com.thinker.util.JDBCUtil.JDBCConnection").newInstance();
            conn = jdbcConnection.getConnection();
            conn.setAutoCommit(false);
            stam = conn.createStatement();
            stam.addBatch(updateIsdefault);
            stam.addBatch(insertSql);
            int count[] = stam.executeBatch();
            conn.commit();
            if(count.length <= 0){
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();
            }
        }finally {
            try {
                stam.close();
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return true;
    }
}
