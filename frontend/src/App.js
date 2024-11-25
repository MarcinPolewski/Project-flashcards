import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';

/* Avatar for testing */
import testAvatar from './assets/test/test-avatar.png';

function App() {
  return (
    <Navbar details={

      /* debug */

      {
        avatar: testAvatar,
        username: "Kacper",
        email: "kacper@polska.pl"
      }

      /* this will be fetched from API*/

    }/>
  );
}

export default App;
