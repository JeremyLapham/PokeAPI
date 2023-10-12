import '../src/Styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonInfo from './Components/DisplayInfoComponent/PokemonInfo';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className='backgroundImg'>
      <PokemonInfo />
    </div>
  );
}

export default App;
