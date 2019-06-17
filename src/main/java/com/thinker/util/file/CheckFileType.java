package com.thinker.util.file;

import java.util.Objects;



public class CheckFileType {

    private static String[] imageType = {".jpg",".jpeg",".png",".gif",".psd",".bmp"};
    private static String[] archiveType = {".zip"};
    private static String[] voices = {".mp3"};
    private static String[] videos = {".mp4"};

    public static String checkType(String fileName,String type){
        if(fileName == null || Objects.equals(fileName, "")) return null;
        if("image".equals(type)) return checkImageType(fileName);
        else if("archive".equals(type)) return checkArchiveType(fileName);
        else if("voice".equals(type)) return checkVoices(fileName);
        else if("video".equals(type)) return checkVideo(fileName);
        return null;
    }
    private static String checkImageType(String fileName){
        for(int i=0;i<imageType.length;i++){
            if(fileName.endsWith(imageType[i])) return imageType[i];
        }
        return null;
    }

    private static String checkArchiveType(String fileName){
        for(int i=0;i<archiveType.length;i++){
            if(fileName.endsWith(archiveType[i]))return archiveType[i];
        }
        return null;
    }

    private static String checkVoices(String fileName){
        for(int i=0;i<voices.length;i++){
            if(fileName.endsWith(voices[i])) return voices[i];
        }
        return null;
    }

    private static String checkVideo(String fileName){
        for(int i=0;i<voices.length;i++){
            if(fileName.endsWith(videos[i])) return videos[i];
        }
        return null;
    }
}
