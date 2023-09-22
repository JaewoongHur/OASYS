package com.dolfin.oasys.domain.gpt.mp3;


import javazoom.jl.player.Player;

import java.io.BufferedInputStream;
import java.io.FileInputStream;

public class PlayerMP3 {
    private String filename;
    public PlayerMP3(String str){
        this.filename=str;
    }
    public void playing(){


        MP3Player mp3Player = new MP3Player(filename);
        mp3Player.play();

    }

}

class MP3Player{
    /*재생할 MP3 파일의 이름과 경로를 저장할 문자열*/
    private final String mp3FileToPlay;
    private Player jlPlayer;

    public MP3Player(String mp3FileToPlay){
        this.mp3FileToPlay = mp3FileToPlay;
    }
    public void play() {
        try {
            FileInputStream fileInputStream = new FileInputStream(mp3FileToPlay);
            BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
            jlPlayer = new Player(bufferedInputStream);
        } catch (Exception e) {
            System.out.println("Problem playing mp3 file " + mp3FileToPlay);
            System.out.println(e.getMessage());
        }

        new Thread() {
            public void run() {
                try {
                    jlPlayer.play();
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            }
        }.start();


    }

    public void close() {
        if (jlPlayer != null) jlPlayer.close();
    }
}