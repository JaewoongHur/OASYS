import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import axios from 'axios';
import './SeniorTalk.css';
import gifWoman from './oasys_woman1.gif'; 


interface IResponse {
  data: string;
}

function SeniorTalk() {
  const [value, setValue] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [lastSpeechTime, setLastSpeechTime] = useState<number | null>(null);

  const sendToBackend = async (text: string) => {
    try {
      const response = await axios.post<string>("http://localhost:8081/gpt/voice", { text }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const receivedText = response.data;

      setValue(receivedText);
      textToSpeech(receivedText);
    } catch (error) {
      console.error("Error sending voice text to backend:", error);
    }
  };

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
      setLastSpeechTime(Date.now());
    },
  });

  useEffect(() => {
    if (isRecording && lastSpeechTime) {
        const checkSilenceInterval = setInterval(() => {
            if (Date.now() - lastSpeechTime > 3000) {
                stop();
                setIsRecording(false);
                setLastSpeechTime(null);  // Reset the last speech time when silence is detected
            }
        }, 1000);

        return () => clearInterval(checkSilenceInterval);
    }
}, [isRecording, lastSpeechTime, stop]);


  const textToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      let voices = synth.getVoices();
      voices = voices.filter(voice => voice.lang.includes('ko'));
      console.log(voices);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices[1];
      synth.speak(utterance);
    } else {
      console.warn("Your browser does not support text to speech.");
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
        stop();
        setIsRecording(false);
        setLastSpeechTime(null);  // Reset the last speech time when stopping
    } else {
        listen();
        setIsRecording(true);
    }
};


  return (
    <div className="seniorTalkContainer">
      <img src={gifWoman} alt="Description of GIF" className="leftGif" />
      <div><span className="answerText">{value}</span></div>
      <button className="btnRecord" onClick={toggleRecording}>
          {isRecording ? "음성 인식 중입니다 🎧" : "말하기 💬"}
      </button>
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        </div>
    </div>
    
);


}

export default SeniorTalk;
