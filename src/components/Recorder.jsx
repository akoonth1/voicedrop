import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Recorder() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try { mediaRecorderRef.current.stop(); } catch (e) { /* ignore */ }
      }
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startAll = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Browser does not support audio recording (getUserMedia).');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      mr.start();
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access error:', err);
      alert('Could not access microphone.');
    }
  };

  const stopAll = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
        }
      } catch (e) { /* ignore */ }
    }
    SpeechRecognition.stopListening();
    setIsRecording(false);
  };

  const playAudio = () => {
    if (!audioURL) return;
    const audio = new Audio(audioURL);
    audio.play();
  };

  const downloadAudio = () => {
    if (!audioURL) return;
    const a = document.createElement('a');
    a.href = audioURL;
    a.download = 'recording.webm';
    a.click();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="recorder-container">
        <p>Browser doesn't support speech recognition.</p>
      </div>
    );
  }

  return (
    <div className="recorder-container">
      <h2>Recorder</h2>
      {!browserSupportsSpeechRecognition && (
        <p style={{ color: 'orange' }}>Browser doesn't support speech recognition. Audio recording still available.</p>
      )}
      <p>Microphone: {listening || isRecording ? 'on' : 'off'}</p>
      <div className="controls">
        <button onClick={startAll} disabled={isRecording}>Start</button>
        <button onClick={stopAll} disabled={!isRecording}>Stop</button>
        <button onClick={resetTranscript}>Reset Transcript</button>
        <button onClick={playAudio} disabled={!audioURL}>Play</button>
        <button onClick={downloadAudio} disabled={!audioURL}>Download</button>
      </div>

      {audioURL && (
        <div style={{ marginTop: 8 }}>
          <audio controls src={audioURL} />
        </div>
      )}

      <div className="transcript" style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>
        {transcript}
      </div>
    </div>
  );
}