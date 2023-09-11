package com.dolfin.oasys.domain.tts.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TextToSpeechRequestModel {
    @JsonProperty(value = "input", required = true)
    private String inputText;

    @JsonProperty(value = "output_path")
    private String outputPath;


}
