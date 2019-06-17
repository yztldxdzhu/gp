package com.thinker.domain;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created by LJ on 2017/4/23.
 */
public class File {

    public static final int FILETYPE1 = 1;  //表示校级文件材料

    public static final int FILETYPE2 = 2;  //表示语言成绩材料

    public static final int FILETYPE3 = 3;  //表示毕业证书材料

    private int fileId;

    private int fileType;   //文件类型

    private int fileIspassed;  //文件是否通过，0未审核，1通过，2未通过

    private String fileUrl;   //文件URL

    private MultipartFile fileContent;   //文件数据流

    private String universityApplicationrule; //申请学校条件

    private int applicationId;

    public String getUniversityApplicationrule() {
        return universityApplicationrule;
    }

    public void setUniversityApplicationrule(String universityApplicationrule) {
        this.universityApplicationrule = universityApplicationrule;
    }

    public MultipartFile getFileContent() {
        return fileContent;
    }

    public void setFileContent(MultipartFile fileContent) {
        this.fileContent = fileContent;
    }

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    public int getFileType() {
        return fileType;
    }

    public void setFileType(int fileType) {
        this.fileType = fileType;
    }

    public int getFileIspassed() {
        return fileIspassed;
    }

    public void setFileIspassed(int fileIspassed) {
        this.fileIspassed = fileIspassed;
    }

    public int getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(int applicationId) {
        this.applicationId = applicationId;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
}
