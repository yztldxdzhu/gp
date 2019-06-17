package com.thinker.serviceImpl;

import com.thinker.domain.File;
import com.thinker.domain.Schedule;
import com.thinker.domain.Universitypicture;
import com.thinker.mapper.FileMapper;
import com.thinker.mapper.ScheduleMapper;
import com.thinker.service.FileService;
import com.thinker.util.DateUtil;
import com.thinker.util.exception.MessageException;
import com.thinker.util.image.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;

    @Autowired
    private ScheduleMapper scheduleMapper;

    //添加文件
    @Override
    public void addFile(File file){
        file.setFileIspassed(ISPASSED);
        fileMapper.insertFile(file);
    }

    //删除文件
    @Override
    public void deleteFile(int fileId){
        fileMapper.deleteFileById(fileId);
    }

    //修改文件
    @Override
    public void modifyFile(File file){
        file.setFileIspassed(ISPASSED);
        fileMapper.modifyFile(file);
    }

    //查找所有文件
    @Override
    public List<File> findAllFile(){
        return fileMapper.selectAllFile() ;
    }

    //查找用户所有文件
    @Override
    public List<File> findUserFileByUserId(int userId){
        return fileMapper.selectUserFileByUserId(userId);
    }

    //审核文件
    @Override
    public void verifyFile(int fileId,int fileIspassed){
        File file = fileMapper.selectFileByFileId(fileId);
        file.setFileIspassed(fileIspassed);
        fileMapper.modifyFileIspassed(fileId,fileIspassed);
        if(fileIspassed == ISPASSED1){
            Schedule schedule = new Schedule();
            schedule.setScheduleStatus(file.getFileType()+1);
            schedule.setScheduleChangetime(DateUtil.getCurrentTime());
            schedule.setApplicationId(file.getApplicationId());
            scheduleMapper.modifySchedule(schedule);
        }
    }

    //上传大学照片
    @Override
    public void uploadUniversityPicture(int universityId,String pictureUrl,MultipartFile[] pictures){
        List<Universitypicture> universitypictureList = new ArrayList<>();
        if(pictures != null && pictures.length != 0){
            for(MultipartFile multipartFile:pictures){
                Universitypicture universitypicture = new Universitypicture();
                String universityPictureUrl = ImageUtil.upload(multipartFile,pictureUrl);
                universitypicture.setUniversitypictureUrl(universityPictureUrl);
                universitypicture.setUniversityId(universityId);
                universitypictureList.add(universitypicture);
            }
            if(universitypictureList.size() != 0){
                fileMapper.insertUniversityPicture(universitypictureList);
            }
        }else{
            throw new MessageException("学校图片上传失败！");
        }
    }

    //上传大学视频
    @Override
    public void uploadUniversityVideo(int universityId,String universityVideoUrl,MultipartFile video){
        if(video != null){
            String videoUrl = ImageUtil.upload(video,universityVideoUrl);
            fileMapper.insertUniversityVideo(universityId,videoUrl);
        }else{
            throw new MessageException("学校视频上传失败！");
        }
    }
}
