import React, { useEffect, useState } from 'react'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import axios from "axios";
import Loader from './Loader';
import toast from 'react-hot-toast';
function CharacterDetail({ selectedId }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes]=useState([])
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function featchData() {

      try {
        setIsLoading(true)
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`)
        setCharacter(data)
        const episodesId=data.episode.map((e)=>e.split("/").at(-1));
        const { data: episodeData } = await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}`)
       setEpisodes([episodeData].flat())
      } catch (err) {
        setCharacter(null)
        // FOR REALLE PROJECT: err.response.data.message
      
        toast.error(err.response.data.error)
       
      }
      finally {
        setIsLoading(false)
      }


    }
    if (selectedId) featchData();
  }, [selectedId])

  if (isLoading)
    return (<div style={{ flex: 1 }}>
      <Loader />
    </div>)
  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>Please select a character.</div>)

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img src={character.image} alt={character.name}
          className="character-detail__img" />
        <div className="character-detail__info">
          <h3 className="name">
            <span>{character.gender === "Male" ? "👨" : "👩"}</span>
            <span>{character.name}</span>
          </h3>
          <div className="info">
            <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
            <span> {character.status} </span>
            <span> - {character.species}</span>
          </div>
          <div className="location">
            <p>Last Known location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add to favourite</button>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes:</h2>
          <button>
            <ArrowDownCircleIcon className='icon' />
          </button>
        </div>
        <ul>
          {episodes.map((item, index) => (
            <li key={item.id}>
              <div>{String(index + 1).padStart(2, "0")} - {item.episode} : <strong>{item.name}</strong></div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CharacterDetail