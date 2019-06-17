package com.thinker.util.JDBCUtil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Created by LJ on 2017/5/12.
 */
public class JDBCConnection {
    //定义MySQL的数据库驱动程序
    public static final String DBDRIVER = "com.mysql.jdbc.Driver";

    //定义MySQL数据库连接地址
    public static final String DBURL = "jdbc:mysql://121.251.19.130:3306/gp?useUnicode=true&amp;characterEncoding=UTF-8";

    //MySQL数据库连接用户名
    public static final String DBUSER = "root";

    //连接密码
    public static String DBPASS = "615615";

    //得到连接对象
    public static Connection getConnection(){
        Connection conn = null;
        try {
            Class.forName(DBDRIVER);
            conn = DriverManager.getConnection(DBURL,DBUSER,DBPASS);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }catch (SQLException e1){
            e1.printStackTrace();
        }
        return conn;
    }
}
