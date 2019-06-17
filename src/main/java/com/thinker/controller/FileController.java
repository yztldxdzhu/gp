package com.thinker.controller;

import com.thinker.domain.File;
import com.thinker.service.FileService;
import com.thinker.util.MsgGenerate;
import com.thinker.util.image.ImageUtil;
import com.thinker.util.user.SessionUtil;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 文件上传管理
 * Created by LJ on 2017/4/23.
 */
@Controller
@RequestMapping(value="/file")
public class FileController extends BaseController {

    public final static String FILETPATH = "public/images/upload/applyFile";   //文件存放路径

    public final static String PICTUREPATH = "public/images/upload/uniPic";   //校园图片存放路径

    public final static String VIDEOPATH = "public/images/upload/uniVideo";   //视频存放路径

    @Autowired
    private FileService fileService;

    //上传文件
    @RequestMapping(value="/addFile")
    @ResponseBody
    public Map<String,Object> addFile(@ModelAttribute File file){
        MultipartFile fileMultipartFile = file.getFileContent();
        if(fileMultipartFile != null){
            String fileUrl = ImageUtil.upload(fileMultipartFile,FILETPATH);
            file.setFileUrl(fileUrl);
            fileService.addFile(file);
            return generateSuccessMsg("上传文件成功！");
        }else{
            return generateFailureMsg("文件上传失败！");
        }
    }

    //删除文件
    @RequestMapping(value="/deleteFile")
    @ResponseBody
    public Map<String,Object> deleteFile(@RequestParam Integer fileId){
        fileService.deleteFile(fileId);
        return generateSuccessMsg("文件删除成功！");
    }

    //修改文件
    @RequestMapping(value="/modifyFile")
    @ResponseBody
    public Map<String,Object> modifyFile(@ModelAttribute File file){
        MultipartFile fileMultipartFile = file.getFileContent();
        if(fileMultipartFile != null){
            String fileUrl = ImageUtil.upload(fileMultipartFile,FILETPATH);
            file.setFileUrl(fileUrl);
            fileService.modifyFile(file);
            return generateSuccessMsg("上传文件成功！");
        }else{
            return generateFailureMsg("文件上传失败！");
        }
    }

    //查找所有文件（管理员管理）
    @RequestMapping(value="/findAllFile")
    @ResponseBody
    public Map<String,Object> findAllFile(){
        Map<String,Object> map = new HashedMap();
        List<File> fileList = fileService.findAllFile();
        List<File> noPassFileList1 = new ArrayList<>();
        List<File> noPassFileList2 = new ArrayList<>();
        List<File> noPassFileList3 = new ArrayList<>();
        List<File> passFileList1 = new ArrayList<>();
        List<File> passFileList2 = new ArrayList<>();
        List<File> passFileList3 = new ArrayList<>();
        List<File> noVerifyFileList1 = new ArrayList<>();
        List<File> noVerifyFileList2 = new ArrayList<>();
        List<File> noVerifyFileList3 = new ArrayList<>();
        for(File file:fileList){
            int fileIspassed = file.getFileIspassed();
            switch (file.getFileType()){
                case 1:
                    switch(fileIspassed){
                        case 0:
                            noVerifyFileList1.add(file);
                            break;
                        case 1:
                            passFileList1.add(file);
                            break;
                        case 2:
                            noPassFileList1.add(file);
                    }
                    break;
                case 2:
                    switch(fileIspassed){
                        case 0:
                            noVerifyFileList2.add(file);
                            break;
                        case 1:
                            passFileList2.add(file);
                            break;
                        case 2:
                            noPassFileList2.add(file);
                    }
                    break;
                case 3:
                    switch(fileIspassed){
                        case 0:
                            noVerifyFileList3.add(file);
                            break;
                        case 1:
                            passFileList3.add(file);
                            break;
                        case 2:
                            noPassFileList3.add(file);
                    }

            }
        }
        map.put("noPassFileList1",noPassFileList1);
        map.put("noPassFileList2",noPassFileList2);
        map.put("noPassFileList3",noPassFileList3);
        map.put("passFileList1",passFileList1);
        map.put("passFileList2",passFileList2);
        map.put("passFileList3",passFileList3);
        map.put("noVerifyFileList1",noVerifyFileList1);
        map.put("noVerifyFileList2",noVerifyFileList2);
        map.put("noVerifyFileList3",noVerifyFileList3);
        return map;
    }

    //根据用户ID查找用户提交的所有文件
    @RequestMapping(value="/findUserFile")
    @ResponseBody
    public Map<String,Object> findUserFile(){
        Map<String,Object> map = new HashMap<>();
        int userId = SessionUtil.getCurrentUser().getUserId();
        List<File> userFileList = fileService.findUserFileByUserId(userId);
        List<File> type1FileList = new ArrayList<>();
        List<File> type2FileList = new ArrayList<>();
        List<File> type3FileList = new ArrayList<>();
        for(File file:userFileList){
            int type = file.getFileType();
            switch(type){
                case 1:
                    type1FileList.add(file);
                    break;
                case 2:
                    type2FileList.add(file);
                    break;
                default: type3FileList.add(file);
            }
        }
        map.put("type1FileList",type1FileList);
        map.put("type2FileList",type2FileList);
        map.put("type3FileList",type3FileList);
        return map;
    }

    //审核文件
    @RequestMapping(value="/verifyFile")
    @ResponseBody
    public Map<String,Object> verifyFile(@RequestParam Integer fileId,@RequestParam Integer fileIspassed){
        fileService.verifyFile(fileId,fileIspassed);
        return generateSuccessMsg("审核成功！");
    }

    //上传学校图片
    @RequestMapping(value="/uploadUniversityPicture")
    @ResponseBody
    public Map<String,Object> uploadUniversityPicture(@RequestParam Integer universityId,@RequestParam MultipartFile[] pictures){
        fileService.uploadUniversityPicture(universityId,PICTUREPATH,pictures);
        return generateSuccessMsg("图片上传成功！");
    }

    //上传学校视频
    @RequestMapping(value="/uploadUniversityVideo")
    @ResponseBody
    public Map<String,Object> uploadUniversityVideo(@RequestParam Integer universityId,@RequestParam MultipartFile video){
        fileService.uploadUniversityVideo(universityId,VIDEOPATH,video);
        return generateSuccessMsg("视频上传成功！");
    }
}
