import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonInfo from './Components/DisplayInfoComponent/PokemonInfo';
import HomePage from './Components/HomeComponent/HomePage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className='backgroundImg'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='pokeInfo' element={<PokemonInfo />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
