import { Settings, Trash } from 'lucide-react';

import useAudioLevels from '../hooks/useAudioLevels';
import useMicrophones from '../hooks/useMicrophones';
import SelectionButton from '../Widgets/SelectionButton';

export default function SprechstundeAssistent() {
  const {
    microphones,
    selectedMicrophone,
    setSelectedMicrophone,
    isLoading: micLoading,
    error: micError,
  } = useMicrophones();

  const {
    audioLevels,
    isRecording,
    isSupported,
    error,
    startRecording,
    stopRecording,
    getAudioLevelColor,
  } = useAudioLevels();

  const getMicrophoneSelection = () => {
    if (microphones.length === 0) {
      return 'Keine Mikrofone gefunden';
    }
    if (selectedMicrophone) {
      return (
        microphones.find((m) => m.deviceId === selectedMicrophone)?.label ||
        'Nicht gefunden'
      );
    }
    return 'Keine Auswahl';
  };

  return (
    <div className="p-4 flex flex-col w-full h-full bg-gray-50 gap-4">
      {/* Audio Recording Section */}
      <div className="flex flex-col gap-3">
        <div className="text-xs font-medium text-gray-700">Audioaufnahme</div>

        <div className="flex flex-row items-center gap-3">
          <div className="text-xs text-gray-600 w-16">Mikrofon</div>
          <SelectionButton
            selection={getMicrophoneSelection()}
            options={microphones.map((mic) => mic.label)}
            onSelectionChange={(label) => {
              const device = microphones.find((m) => m.label === label);
              if (device) setSelectedMicrophone(device.deviceId);
            }}
            className="min-w-[150px]"
            disabled={micLoading || microphones.length === 0}
          />
          <div className="flex flex-1" />
          {(micError || error) && (
            <div className="text-xs text-red-600 mr-2">{micError || error}</div>
          )}
          {!isSupported && (
            <div className="text-xs text-yellow-600 mr-2">
              Mikrofon nicht unterstützt
            </div>
          )}
          <button
            type="button"
            onClick={
              isRecording
                ? stopRecording
                : () => startRecording(selectedMicrophone || undefined)
            }
            disabled={!isSupported || microphones.length === 0}
            className={`px-2 py-1 text-xs border rounded-sm h-6 ${
              isRecording
                ? 'text-red-700 border-red-300 bg-red-50 hover:bg-red-100'
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            } ${!isSupported || microphones.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRecording ? 'Aufnahme Stoppen' : 'Neue Aufnahme'}
          </button>
        </div>

        <div className="flex flex-row items-center">
          <div className="text-xs text-gray-600 mr-2">Eingangspegel</div>
          {isRecording && (
            <div className="text-xs text-red-600 mr-2 animate-pulse">
              ● LIVE
            </div>
          )}
          <div className="flex flex-row gap-1">
            {audioLevels.map((level, levelIndex) => (
              <div
                key={`level-bar-${levelIndex * 10 + level}`}
                className="w-2.5 h-5 rounded-sm"
                style={{
                  backgroundColor: getAudioLevelColor(level),
                  opacity: isRecording ? 0.9 : 0.3,
                }}
              />
            ))}
          </div>
          <div className="flex flex-1" />
          <div className="text-xs text-gray-700 flex-1">
            30.07.2025-17:28-lkm-docu-record.caf
          </div>
          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded border border-gray-300"
          >
            <Trash className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="flex flex-col gap-3">
        <div className="text-xs font-medium text-gray-700">Analyse</div>

        <div className="flex flex-row items-center">
          <SelectionButton
            selection="Erstgespraech"
            options={['Erstgespraech', 'Nachbehandlung', 'Kontrolle']}
            className="min-w-[120px]"
          />
          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center hover:text-gray-600"
          >
            <Settings className="w-4 h-4 text-gray-500" />
          </button>
          <div className="flex flex-1" />

          <button
            type="button"
            className="px-2 py-1 text-xs text-gray-700 border border-gray-300 rounded-sm hover:bg-gray-100 h-6"
          >
            Analyse Starten
          </button>
        </div>
      </div>
    </div>
  );
}
