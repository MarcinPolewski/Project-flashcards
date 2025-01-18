import './App.css';
import { ThemeProvider } from './contexts/ThemeContext/ThemeContext';
import { OverlayProvider } from './contexts/OverlayContext/OverlayContext';

import Routes from './routes/Routes';
import AuthProvider from './contexts/AuthContext/AuthContext';

function App() {

  return (
    <OverlayProvider>
    <ThemeProvider>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
    </OverlayProvider>
  );
}

export default App;
