import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';

/* Avatar for testing */
import testAvatar from './assets/test/test-avatar.png';

function App() {
  return (
    <Navbar avatar={testAvatar}/>
  );
}

export default App;
