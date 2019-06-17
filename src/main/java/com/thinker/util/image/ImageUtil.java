package com.thinker.util.image;

import com.thinker.util.exception.MessageException;
import com.thinker.util.user.SessionUtil;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * @author lzh
 */
public class ImageUtil {

    /**
     * 下载文件
     */
    public static String upload(MultipartFile multipartFile,String TARGETPATH){
        String baseUrl = SessionUtil.getSession().getServletContext().getRealPath("/")+TARGETPATH;
        String fileName = null;
        fileName = multipartFile.getOriginalFilename();
        if(fileName != null){
            String finalUrl = baseUrl+File.separator+fileName;
            try {
                multipartFile.transferTo(new File(finalUrl));
                return TARGETPATH+File.separator+fileName;
            } catch (IOException e) {
                e.printStackTrace();
                throw new MessageException("文件上传失败！");
            }
        }else{
            return null;
        }
    }
}
