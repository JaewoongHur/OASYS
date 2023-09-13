package com.dolfin.oasys.domain.tts.service;


import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileOutputStream;
import java.io.OutputStream;

@SpringBootApplication
public class TtsApplication {
//    SpringApplication.run(TtsApplication.class, args);
    public static void main(String... args) throws Exception{

        try(TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()){

            SynthesisInput input = SynthesisInput.newBuilder().setText("재웅아 뭐하냐?").build();

            VoiceSelectionParams voice = VoiceSelectionParams.newBuilder().setLanguageCode("ko-KR").setSsmlGender(SsmlVoiceGender.FEMALE).build();

            AudioConfig audioConfig= AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();
            SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input,voice,audioConfig);

            ByteString audioContents = response.getAudioContent();

            try(OutputStream out = new FileOutputStream("output.mp3")){
                out.write(audioContents.toByteArray());
                System.out.println("Audio content written to file \"output.mp3\"");
            }
        }

    }

}
