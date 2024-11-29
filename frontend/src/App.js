import './App.css';
import { ThemeProvider } from './Components/ThemeContext/ThemeContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Components/pages/Home/Home';
import Settings from './Components/pages/Settings/Settings';
import CreateFlashcard from './Components/pages/CreateFlashcard/CreateFlashcard';
import Decks from './Components/pages/Decks/Decks';
import Import from './Components/pages/Import/Import';
import Statistics from './Components/pages/Statistics/Statistics';

/* Avatar for testing */
import testAvatar from './assets/test/test-avatar.png';

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

    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home details={APIdummy}/>} />
          <Route path="/settings" element={<Settings details={APIdummy} />} />
          <Route path="/statistics" element={<Statistics details={APIdummy} />} />
          <Route path="/decks" element={<Decks details={APIdummy} />} />
          <Route path="/import" element={<Import details={APIdummy} />} />
          <Route path="/create-flashcard" element={<CreateFlashcard details={APIdummy} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
