
import "./App.css";
import CharacterDetail from "./component/CharacterDetail";
import CharacterList from "./component/CharacterList";
import Navbar from "./component/Navbar";
import {allCharacters} from "../data/data";

function App(){
  return (
<div className="app">
<Navbar/>
<div className="main">
  <CharacterList allCharacters={allCharacters}/>
  <CharacterDetail />
</div>
</div>
  )
}
export default App;