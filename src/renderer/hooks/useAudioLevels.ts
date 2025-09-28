import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioLevelsReturn {
  audioLevels: number[];
  isRecording: boolean;
  isSupported: boolean;
  error: string | null;
  startRecording: (deviceId?: string) => Promise<void>;
  stopRecording: () => void;
  getAudioLevelColor: (level: number) => string;
}

export default function useAudioLevels(): UseAudioLevelsReturn {
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(10).fill(0));
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const getAudioLevelColor = useCallback((level: number): string => {
    if (level > 7) return '#ef4444';
    if (level > 4) return '#f59e0b';
    return '#10b981';
  }, []);

  const analyzeMicrophoneData = useCallback(() => {
    if (!analyzerRef.current || !dataArrayRef.current) return;

    analyzerRef.current.getByteFrequencyData(dataArrayRef.current);

    // Calculate average volume across frequency ranges
    const bufferLength = dataArrayRef.current.length;
    const segmentSize = Math.floor(bufferLength / 10);
    const newLevels: number[] = [];

    for (let i = 0; i < 10; i += 1) {
      const start = i * segmentSize;
      const end = Math.min(start + segmentSize, bufferLength);
      let sum = 0;

      for (let j = start; j < end; j += 1) {
        sum += dataArrayRef.current[j];
      }

      const average = sum / (end - start);
      // Normalize to 0-10 scale
      const level = Math.floor((average / 255) * 10);
      newLevels.push(Math.min(level, 10));
    }

    setAudioLevels(newLevels);

    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(analyzeMicrophoneData);
    }
  }, [isRecording]);

  const startRecording = useCallback(
    async (deviceId?: string) => {
      try {
        setError(null);

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setIsSupported(false);
          setError('Microphone access not supported in this browser');
          return;
        }

        const audioConstraints: any = {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        };

        if (deviceId) {
          audioConstraints.deviceId = { exact: deviceId };
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: audioConstraints,
        });

        mediaStreamRef.current = stream;

        // Create audio context and analyzer
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyzer = audioContext.createAnalyser();

        analyzer.fftSize = 256;
        analyzer.smoothingTimeConstant = 0.3;

        source.connect(analyzer);

        audioContextRef.current = audioContext;
        analyzerRef.current = analyzer;
        dataArrayRef.current = new Uint8Array(analyzer.frequencyBinCount);

        setIsRecording(true);
        analyzeMicrophoneData();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to access microphone';
        setError(errorMessage);
      }
    },
    [analyzeMicrophoneData],
  );

  const stopRecording = useCallback(() => {
    setIsRecording(false);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyzerRef.current = null;
    dataArrayRef.current = null;

    // Reset levels to zero
    setAudioLevels(Array(10).fill(0));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, [stopRecording]);

  return {
    audioLevels,
    isRecording,
    isSupported,
    error,
    startRecording,
    stopRecording,
    getAudioLevelColor,
  };
}
