import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);

window.electron?.ipcRenderer.once('ipc-example', () => {});
window.electron?.ipcRenderer.sendMessage('ipc-example', ['ping']);
