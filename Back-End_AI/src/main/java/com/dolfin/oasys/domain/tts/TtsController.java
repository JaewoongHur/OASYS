package com.dolfin.oasys.domain.tts;

import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.List;

@RestController
@RequestMapping("/tts")
public class TtsController {

    @PostMapping("/make")
    public void makeTts(@RequestParam String str, @RequestParam String gender, @RequestParam String kind) throws Exception{
        try(    TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()){


            SynthesisInput input = SynthesisInput.newBuilder().setText(str).build();
            VoiceSelectionParams voice;
            if(gender.equals("female")) {
                voice = VoiceSelectionParams.newBuilder()
                        .setLanguageCode("ko-KR")
                        .setSsmlGender(SsmlVoiceGender.FEMALE)
                        .build();
            }
            else{
                voice = VoiceSelectionParams.newBuilder().setLanguageCode("ko-KR").setName("ko-KR-Wavenet-C").setSsmlGender(SsmlVoiceGender.MALE).build();

            }
            AudioConfig audioConfig= AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();
            SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input,voice,audioConfig);

            ByteString audioContents = response.getAudioContent();

            try(OutputStream out = new FileOutputStream(kind+".mp3")){
                out.write(audioContents.toByteArray());
                System.out.println("Audio content written to file" +kind+"\".mp3\"");
            }
        }
    }

}
