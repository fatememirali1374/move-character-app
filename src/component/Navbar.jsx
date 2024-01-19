import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Modal from "./Modal"
import { Character } from "./CharacterList"

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">LOGO😍</div>
      {children}
     
    </nav>
  )
}


export function Search({query, setQuery}) {
  return <input
  value={query} onChange={(e)=>setQuery(e.target.value)} type="text" className='text-field' placeholder='search...' />
}
export function SearchResult({ numOfResult }) {
 return <div className="navbar__result">found {numOfResult} characters</div>
}
export function Favourite ({favourites,onDeleteFavourite}){
  const [isOpen, setIsOpen]= useState(false)
  return (
    <>
    <Modal open={isOpen} onOpen={setIsOpen} title="List of favourites">
      {
        favourites.map((item)=>(
          <Character key={item.id} item={item} selectedId="1" onSelectCharacter={()=>{}}>
             <button className='icon red'  onClick={() => onDeleteFavourite(item.id)} >
               <TrashIcon/>
            </button>
          </Character>
        ))
      }</Modal>
    <button className="heart" onClick={()=>setIsOpen((is)=>!is)}>
    <HeartIcon className="icon" />
    <span className="badge">{favourites.length}</span>
  </button></>
  )
}