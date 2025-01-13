import './App.css';
import { ThemeProvider } from './contexts/ThemeContext/ThemeContext';
import { OverlayProvider } from './contexts/OverlayContext/OverlayContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Components/pages/Home/Home';
import Settings from './Components/pages/Settings/Settings';
import CreateFlashcard from './Components/pages/CreateFlashcard/CreateFlashcard';
import Decks from './Components/pages/Decks/Decks';
import Share from './Components/pages/Share/Share';
import Statistics from './Components/pages/Statistics/Statistics';
import Study from './Components/pages/Study/Study';
import FolderPage from './Components/pages/FolderPage/FolderPage';
import DeckPage from './Components/pages/DeckPage/DeckPage';

import Login from './Components/pages/Login/Login';
import Register from './Components/pages/Register/Register';
import ForgotPassword from './Components/pages/ForgotPassword/ForgotPassword';
import PasswordReset from './Components/pages/ForgotPassword/PasswordReset';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { useEffect, useState } from 'react';
import CustomerService from './services/CustomerService';
import VerificationSuccess from './Components/pages/VerificationSuccess/VerificationSuccess';

function App() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const data = await CustomerService.getSelf();
          setUserData(data);
          /* mock avatar */
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      };
      fetchUserData();
  },[])

  return (
    <OverlayProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
          <Route path="/decks" element={<PrivateRoute><Decks details={userData} /></PrivateRoute>} />
          <Route path="/share" element={<PrivateRoute><Share details={userData} /></PrivateRoute>} />
          <Route path="/study/:deckId" element={<PrivateRoute><Study details={userData} /></PrivateRoute>} />
          <Route path="/deck/:deckId" element={<PrivateRoute><DeckPage details={userData} /></PrivateRoute>} />
          <Route path="/folder/:id" element={<PrivateRoute><FolderPage details={userData} /></PrivateRoute>} />
          <Route path="/create-flashcard" element={<PrivateRoute><CreateFlashcard details={userData} /></PrivateRoute>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/password-reset" element={<PasswordReset/>} />
          <Route path="/verify-email/:email/:token" element={<VerificationSuccess/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </OverlayProvider>
  );
}

export default App;
