
import { useState } from "react";

type UseVoiceReturn = {
  isListening: boolean;
  startListening: (onResult: (transcript: string) => void) => void;
  stopListening: () => void;
  isSpeaking: boolean;
  speak: (text: string) => void;
};

export function useVoice(): UseVoiceReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  let recognition: SpeechRecognition | null = null;

  // Voice-to-Text
  const startListening = (onResult: (transcript: string) => void) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      onResult(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Text-to-Speech
  const speak = (text: string) => {
    if (!window.speechSynthesis) {
      alert("Speech Synthesis not supported in your browser.");
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(text);
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return { isListening, startListening, stopListening, isSpeaking, speak };
}
