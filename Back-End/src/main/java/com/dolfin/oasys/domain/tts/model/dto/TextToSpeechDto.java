package com.dolfin.oasys.domain.tts.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
@Builder
public class TextToSpeechDto {
    private String voice;
    private String input;
    private String audioConfig;

    public TextToSpeechDto(String voice,String input, String audioConfig){
        this.voice=voice;
        this.input=input;
        this.audioConfig=audioConfig;
    }

}
