import { useState, useEffect, useCallback } from 'react';

interface MicrophoneDevice {
  deviceId: string;
  label: string;
}

interface UseMicrophonesReturn {
  microphones: MicrophoneDevice[];
  selectedMicrophone: string | null;
  setSelectedMicrophone: (deviceId: string) => void;
  isLoading: boolean;
  error: string | null;
  refreshMicrophones: () => Promise<void>;
}

export default function useMicrophones(): UseMicrophonesReturn {
  const [microphones, setMicrophones] = useState<MicrophoneDevice[]>([]);
  const [selectedMicrophone, setSelectedMicrophone] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMicrophoneDevices = useCallback(async (): Promise<
    MicrophoneDevice[]
  > => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      throw new Error('Device enumeration not supported');
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputs = devices.filter(
      (device) => device.kind === 'audioinput',
    );

    return audioInputs.map((device, index) => ({
      deviceId: device.deviceId,
      label: device.label || `Mikrofon ${index + 1}`,
    }));
  }, []);

  const refreshMicrophones = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Request microphone permission to get device labels
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());

      const devices = await getMicrophoneDevices();
      setMicrophones(devices);

      if (devices.length === 0) {
        setError('Keine Mikrofone gefunden');
        setSelectedMicrophone(null);
      } else if (!selectedMicrophone && devices.length > 0) {
        // Set default selection to first device if none selected
        setSelectedMicrophone(devices[0].deviceId);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Mikrofonzugriff verweigert';
      setError(errorMessage);
      setMicrophones([]);
      setSelectedMicrophone(null);
    } finally {
      setIsLoading(false);
    }
  }, [getMicrophoneDevices, selectedMicrophone]);

  // Listen for device changes
  useEffect(() => {
    const handleDeviceChange = () => {
      refreshMicrophones();
    };

    if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
      navigator.mediaDevices.addEventListener(
        'devicechange',
        handleDeviceChange,
      );

      return () => {
        navigator.mediaDevices.removeEventListener(
          'devicechange',
          handleDeviceChange,
        );
      };
    }

    return undefined;
  }, [refreshMicrophones]);

  // Initial load
  useEffect(() => {
    refreshMicrophones();
  }, [refreshMicrophones]);

  return {
    microphones,
    selectedMicrophone,
    setSelectedMicrophone,
    isLoading,
    error,
    refreshMicrophones,
  };
}
