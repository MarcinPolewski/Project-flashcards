import './App.css';
import { ThemeProvider } from './Components/ThemeContext/ThemeContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Components/pages/Home/Home';
import Settings from './Components/pages/Settings/Settings';

/* Avatar for testing */
import testAvatar from './assets/test/test-avatar.png';

const APIdummy =

  /* debug */

  {
    avatar: testAvatar,
    username: "Kacper",
    email: "kacper@polska.pl"
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
