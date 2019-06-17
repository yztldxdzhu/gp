package com.thinker.service;

import com.thinker.domain.File;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Created by mgh on 2017/4/18.
 */
public interface FileService {
    int ISPASSED = 0;   //表示文件未审核
    int ISPASSED1 = 1;   //表示文件审核通过
    int ISPASSED2 = 2;   //表示文件审核未通过

    void addFile(File file);

    void deleteFile(int fileId);

    List<File> findAllFile();

    List<File> findUserFileByUserId(int userId);

    void verifyFile(int fileId,int fileIspassed);

    void modifyFile(File file);

    void uploadUniversityPicture(int universityId,String pictureUrl,MultipartFile[] pictures);

    void uploadUniversityVideo(int universityId,String universityVideoUrl,MultipartFile video);

}
