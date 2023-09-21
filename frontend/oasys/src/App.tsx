<<<<<<< HEAD
import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import axios from 'axios';
import './App.css';

interface IResponse {
  data: string;
}

function App() {
  const [value, setValue] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

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
    },
  });

  const textToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;




      let voices = synth.getVoices();
      voices = voices.filter(voices => voices.lang.includes('ko'));

      console.log(voices);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices[1];
      synth.speak(utterance);
    } else {
      console.warn("Your browser does not support text to speech.");
    }
  };

  const init=()=>{
    const init = axios.post("http://localhost:8081/gpt");
  }
  
  
  const toggleRecording = () => {
    if (isRecording) {
      stop();
      setIsRecording(false);
      sendToBackend(value);
    } else {
      listen();
      setIsRecording(true);
    }
  };

  return (
    <div>
      <div className="container">
        <div><span className="AnswerText">{value}</span></div>
        <button onClick={init}>시작</button>
        <button className="BtnRecord" onClick={toggleRecording}>
          {isRecording ? "녹음 중지" : "녹음 시작"}
        </button>
        {listening}
      </div>
    </div>
  );
=======
/* Import */
import router from "@/router";
import { RouterProvider } from "react-router-dom";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Style */
const MainContainer = styled("div")`
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* App Component */
function App() {
    return (
        <MainContainer>
            <RouterProvider router={router} />
        </MainContainer>
    );
>>>>>>> ba7f04fa2de67b3ed6367f05b149e02d520fe07f
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default App;
