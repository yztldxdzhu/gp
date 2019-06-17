package com.thinker.util.file.decompress;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class UnzipUtil {

    public static boolean unzip(String originLocation,String unZipLocation){
        File file = new File(originLocation);
        File unzip = new File(unZipLocation);
        if(!file.exists()) return false;
        if(!unzip.exists()) unzip.mkdirs();
        try {
            BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
            ZipInputStream zis = new ZipInputStream(bis);
            BufferedOutputStream bos ;
            ZipEntry zipEntry ;
            while((zipEntry = zis.getNextEntry()) != null){
                String name = zipEntry.getName();
                boolean isDirectory = false;
                if(name.endsWith("/")){
                    isDirectory = true;
                    (new File(name)).mkdirs();
                }
                File tmp = new File(new File(unZipLocation+"/"+name).getParent());
                if(!tmp.exists())
                    tmp.mkdirs();
                if(!isDirectory) {
                    bos = new BufferedOutputStream(new FileOutputStream(unZipLocation + "/" + name));
                    int b;
                    while ((b = zis.read()) != (-1)) {
                        bos.write(b);
                    }
                    bos.flush();
                    bos.close();
                }
            }
            bis.close();
            zis.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return false;

    }
}
