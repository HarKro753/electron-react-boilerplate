import { Route, Routes } from 'react-router-dom';
import SprechstundeAssistent from './pages/SprechstundeAssistent';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/sprechstunde-assistant"
        element={<SprechstundeAssistent />}
      />
    </Routes>
  );
}

export default App;
