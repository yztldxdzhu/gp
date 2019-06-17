package com.thinker.util.file;

import com.thinker.util.HttpServlet;
import com.thinker.util.ResultMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;

/**
 *
 */
public class FileUpload {

    /**
     * @param request
     * @param save_path
     * @return
     * @throws IOException
     */
    public static String upload(HttpServletRequest request, String save_path) throws IOException {
        try {
            //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
            String saveRelativePath = "";
            String fileName = "";
            CommonsMultipartResolver multipartResolver =
                    new CommonsMultipartResolver(request.getSession().getServletContext());
            //检查form中是否有enctype="multipart/form-data"
            if (multipartResolver.isMultipart(request)) {
                //将request变成多部分request
                MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
                //获取multiRequest 中所有的文件名
                Iterator iter = multiRequest.getFileNames();
                if (iter.hasNext()) {
                    //一次遍历所有文件
                    MultipartFile file = multiRequest.getFile(iter.next().toString());
                    if (file != null) {
                        fileName = file.getOriginalFilename();
                        saveRelativePath = save_path + "/" + fileName;
                        String filePath = request.getSession().getServletContext().getRealPath("")
                                + "/" + saveRelativePath;
                        File saveFile = new File(filePath);
                        if (!saveFile.getParentFile().exists()) {
                            saveFile.getParentFile().mkdirs();
                        }
                        file.transferTo(saveFile);
                    }
                }
            }
            if (!Objects.equals(saveRelativePath, "")) {
                return saveRelativePath;
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     *
     * @param fold 文件夹名称
     * @return
     */
    public static Map<String, Object> uploadImage(String fold) {
        if (fold == null || Objects.equals(fold, "")) return ResultMap.generateFailureMsg("fold为空");
        String path = null;
        try {
            path = upload(HttpServlet.getRequest(), fold);
        } catch (IOException e) {
            e.printStackTrace();
            return ResultMap.generateFailureMsg("未知错误");
        }
        if (path == null) return ResultMap.generateFailureMsg("上传文件为空");
        //todo 文件格式检测

        Map<String, Object> result = ResultMap.generateSuccessMsg("上传成功");
        result.put("path", path);
        return result;
    }
}
