import { useState } from 'react';
import './App.css';

function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const reset = () => setCount(0);

  return { count, increment, reset };
}

function App() {
  const { count, increment, reset } = useCounter();

  const openNewWindow = () => {
    window.electron.ipcRenderer.sendMessage('open-new-window');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Hello World</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-xl text-gray-600 mb-4">Count: {count}</p>
          <div className="space-x-3">
            <button
              type="button"
              onClick={increment}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 active:scale-95"
            >
              Increment Counter
            </button>
            <button
              type="button"
              onClick={reset}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 active:scale-95"
            >
              Reset Counter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            type="button"
            onClick={openNewWindow}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 active:scale-95"
          >
            Open New Window
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
