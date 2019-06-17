package com.thinker.mapper;

import com.thinker.domain.File;
import com.thinker.domain.Universitypicture;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by LJ on 2017/4/23.
 */
@Component
public interface FileMapper {

    void insertFile(File file);

    void deleteFileById(int fileId);

    List<File> selectAllFile();

    List<File> selectUserFileByUserId(int userId);

    void modifyFileIspassed(@Param(value="fileId") int fileId, @Param(value="fileIspassed")int fileIspassed);

    void modifyFile(File file);

    File selectFileByFileId(int fileId);

    void insertUniversityPicture(List<Universitypicture> universitypictureList);

    void insertUniversityVideo(@Param(value="universityId") int universityId,@Param(value="videoUrl") String videoUrl);
}
