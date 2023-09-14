package com.dolfin.oasys.domain.stt.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class VideoController {
    public static void detect() {
        try {
            ProcessBuilder pb = new ProcessBuilder("C:\\Users\\SSAFY\\AppData\\Local\\Programs\\Python\\Python311\\python",
                    System.getProperty("user.dir") + "\\src\\main\\resources\\python\\sample.py");
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), "euc-kr"));
            String line = " ";
            String output = "";

            while(line != null) {
                output += line;
                line = reader.readLine();
                output += "\n";
            }

            System.out.println(output);
        } catch (Exception e) {

        }
    }

}
