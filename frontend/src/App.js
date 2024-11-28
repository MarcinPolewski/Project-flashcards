import './App.css';

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

    <div>

      <Settings details={APIdummy}/>

    </div>
  );
}

export default App;
