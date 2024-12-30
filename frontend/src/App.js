import './App.css';
import { ThemeProvider } from './contexts/ThemeContext/ThemeContext';
import { OverlayProvider } from './contexts/OverlayContext/OverlayContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Components/pages/Home/Home';
import Settings from './Components/pages/Settings/Settings';
import CreateFlashcard from './Components/pages/CreateFlashcard/CreateFlashcard';
import Decks from './Components/pages/Decks/Decks';
import Import from './Components/pages/Import/Import';
import Statistics from './Components/pages/Statistics/Statistics';

/* Avatar for testing */
import testAvatar from './assets/test/test-avatar.png';
import Login from './Components/pages/Login/Login';
import Register from './Components/pages/Register/Register';
import ForgotPassword from './Components/pages/ForgotPassword/ForgotPassword';
import PasswordReset from './Components/pages/ForgotPassword/PasswordReset';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

const APIdummy =

  /* debug */

  {
    avatar: testAvatar,
    username: "Kacper",
    email: "kacper@polska.pl",
    daysLearning: 212, longestStreak: 20, currentStreak: 2
  }

  /* this will be fetched from API*/


function App() {
  return (

    /* ATM no sections and no routing */

    <OverlayProvider>
    <ThemeProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home details={APIdummy}/></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings details={APIdummy} /></PrivateRoute>} />
        <Route path="/statistics" element={<PrivateRoute><Statistics details={APIdummy} /></PrivateRoute>} />
        <Route path="/decks" element={<PrivateRoute><Decks details={APIdummy} /></PrivateRoute>} />
        <Route path="/create-flashcard" element={<PrivateRoute><CreateFlashcard details={APIdummy} /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </OverlayProvider>

  );
}

export default App;
