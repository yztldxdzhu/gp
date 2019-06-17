package com.thinker.util.JDBCUtil;

import com.thinker.domain.Goods;
import com.thinker.search.BaseIndex;
import com.thinker.search.GoodsIndex;
import com.thinker.util.DateUtil;

import java.sql.*;

/**
 * Created by LJ on 2017/5/14.
 */
public class GoodsJDBC {

    public static boolean insertGoods(Goods goods){
        Connection conn = null;
        PreparedStatement stam = null;
        ResultSet rs = null;
        try {
            BaseIndex<Goods> goodsIndex = new GoodsIndex();
            JDBCConnection jdbcConnection = (JDBCConnection)Class.forName("com.thinker.util.JDBCUtil.JDBCConnection").newInstance();
            conn = jdbcConnection.getConnection();
            conn.setAutoCommit(false);
            stam = conn.prepareStatement("insert into goods (goods_name, goods_price,goods_type,goods_target,goods_introduction,goods_successcount,goods_picture,goods_status,goods_stock, goods_time) values (?,?,?,?,?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
            stam.setString(1,goods.getGoodsName());
            stam.setInt(2,goods.getGoodsPrice());
            stam.setString(3,goods.getGoodsType());
            stam.setString(4,goods.getGoodsTarget());
            stam.setString(5,goods.getGoodsIntroduction());
            stam.setInt(6,goods.getGoodsSuccesscount());
            stam.setString(7,goods.getGoodsPicture());
            stam.setInt(8,goods.getGoodsStatus());
            stam.setInt(9,goods.getGoodsStock());
            stam.setTimestamp(10, DateUtil.getCurrentTime());
            int rowCount = stam.executeUpdate();
            rs = stam.getGeneratedKeys();
            if(rowCount !=0 && rs.next()){
                goods.setGoodsId(rs.getInt(1));
                goodsIndex.indexDoc(goods);
                conn.commit();
            }else{
                conn.rollback();
                return false;
            }
        } catch (Exception e) {
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();
            }
            return false;
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
