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
import FolderPage from './Components/pages/FolderPage/FolderPage';
import DeckPage from './Components/pages/DeckPage/DeckPage';

/* Avatar for testing */
import testAvatar from './assets/test/test-avatar.png';
import Login from './Components/pages/Login/Login';
import Register from './Components/pages/Register/Register';
import ForgotPassword from './Components/pages/ForgotPassword/ForgotPassword';
import PasswordReset from './Components/pages/ForgotPassword/PasswordReset';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { useEffect, useState } from 'react';
import { getUserData } from './services/userService';

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

  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const data = await getUserData();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
  },)

  return (

    /* ATM no sections and no routing */

    <OverlayProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/*<Route path="/" element={<Home details={APIdummy}/>} />*/}
          <Route path="/" element={<Home details={APIdummy}/>} />
          <Route path="/settings" element={<Settings details={APIdummy} />} />
          <Route path="/statistics" element={<Statistics details={APIdummy} />} />
          <Route path="/decks" element={<Decks details={APIdummy} />} />
          <Route path="/import" element={<Import details={APIdummy} />} />
          <Route path="/create-flashcard" element={<CreateFlashcard details={APIdummy} />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/password-reset" element={<PasswordReset/>} />
          <Route path="/folder/:id" element={<PrivateRoute><FolderPage details={APIdummy}/></PrivateRoute>} />
          <Route path="/deck/:id" element={<PrivateRoute><DeckPage details={APIdummy}/> </PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </OverlayProvider>

  );
}

export default App;
