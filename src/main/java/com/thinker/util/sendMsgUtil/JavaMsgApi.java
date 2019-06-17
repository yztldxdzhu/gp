package com.thinker.util.sendMsgUtil;

import org.apache.http.HttpEntity;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Created by LJ on 2017/4/7.
 */
public class JavaMsgApi {
    private static final String URl_SENT_MSG = "http://yunpian.com/v1/sms/send.json";
    private static final String ENCODING = "UTF-8";

    public static String sendMsg(String apiKey,String text,String mobile){
        Map<String,String> params = new HashMap<>();
        params.put("apikey",apiKey);
        params.put("text",text);
        params.put("mobile",mobile);
        return post(URl_SENT_MSG,params);
    }
    public static String post(String url,Map<String,String> params){
        CloseableHttpClient httpClient = HttpClients.createDefault();
        String responseMsg = "";
        CloseableHttpResponse response = null;
        try{
            HttpPost method = new HttpPost(url);
            if(params != null){
                List<BasicNameValuePair> paramList = new LinkedList<>();
                for(Map.Entry<String,String> param:params.entrySet()){
                    paramList.add(new BasicNameValuePair(param.getKey(),param.getValue()));
                }
                method.setEntity(new UrlEncodedFormEntity(paramList,ENCODING));
            }
            response = httpClient.execute(method);
            if(response.getStatusLine().getStatusCode() == 200){
                HttpEntity entity = response.getEntity();
                if(entity != null){
                    responseMsg = EntityUtils.toString(entity);
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            try{
                if(response != null)
                    response.close();
            }catch(Exception e1){
                e1.printStackTrace();
            }
        }
        return responseMsg;
    }
}
