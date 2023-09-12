package com.dolfin.oasys.domain.stt.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;

@RestController
public class NaverController {
    @GetMapping("fileUpload")
    public String fileUpload(){

//    public String fileUpload(@RequestParam("upload") MultipartFile upload,
//                             HttpServletRequest req) {
        System.out.println("NaverController STT " + new Date());

//        // 음성 파일 업로드 경로
//        String uploadpath = req.getServletContext().getRealPath("/upload");
//
//        String filename = upload.getOriginalFilename();
//
//        String filepath = uploadpath + "/" + filename;
//
//        try { // 파일 복사
//            BufferedOutputStream os = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
//            os.write(upload.getBytes());
//            os.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "fail";
//        }

        // Naver Cloud AI
        String resp = NaverCloud.stt("C:\\Users\\SSAFY\\Desktop\\stt\\S09P22A106\\Back-End\\src\\main\\java\\com\\dolfin\\oasys\\domain\\stt\\controller\\음성_test_cut.mp3");
        return resp;
    }
}