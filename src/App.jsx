
import "./App.css";
import CharacterDetail from "./component/CharacterDetail";
import CharacterList from "./component/CharacterList";
import Navbar, { Search, SearchResult } from "./component/Navbar";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("")
  const[selectedId, setSelectedId]= useState(null)
  
  useEffect(() => {
    async function featchData() {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`)
        setCharacters(data.results.splice(0,5))
      } catch (err) {
        setCharacters([])
        // FOR REALLE PROJECT: err.response.data.message
        // console.log(err.response.data.error);
        toast.error(err.response.data.error)
      }
      finally {
        setIsLoading(false)
      }
    }
    featchData();

  }, [query])

  // useEffect(() => {
  //   setIsLoading(true)
  //   axios.get("https://rickandmortyapi.com/api/character")
  //     .then(({data}) => {
  //       setCharacters(data.results.slice(0, 5))

  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.error)
  //     }) 
  //     .finally(() => setIsLoading(false))
  // }, [])

  //   useEffect(()=>{
  //     async function featchData(){
  //      try{
  //       setIsLoading(true)
  //       const res= await fetch("https://rickandmortyapi.com/api/character")
  //       if (!res.ok) throw new Error("something went wong!")
  //        const data= await res.json();
  //        setCharacters(data.results.slice(0,5))

  //      } catch(err){
  //       // FOR REALLE PROJECT: err.response.data.message
  // toast.error(err.message)
  //      }
  //      finally{
  //       setIsLoading(false)
  //      }
  //     }
  //     featchData();

  //   },[])

  // useEffect(() => {
  //   setIsLoading(true)
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("something went wong!");
  //       return res.json()
  //     })
  //     .then((data) => {
  //       setCharacters(data.results.slice(0, 5))

  //     })
  //     .catch((err) => {
  //       toast.error(err.message)
  //     })
  //     .finally(() => setIsLoading(false))
  // }, [])

 

  const handleSelectCharacter=(id)=>{
    setSelectedId(prevId =>prevId === id ? null:id);
  }
  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <div className="main">
        <CharacterList characters={characters} isLoading={isLoading} 
        onSelectCharacter={handleSelectCharacter} selectedId={selectedId} />
        <CharacterDetail selectedId={selectedId}  />
      </div>
    </div>
  )
}
export default App;