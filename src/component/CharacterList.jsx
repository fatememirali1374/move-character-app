import { EyeDropperIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import Loader from './Loader'

function CharacterList({ characters, isLoading, onSelectCharacter, selectedId }) {
    if (isLoading)
        return (
            <div className='characters-list'>
                <Loader />
            </div>
        )
    return (
        <div className="characters-list">
            {characters.map((item) => (
                <Character key={item.id} selectedId={selectedId} item={item} onSelectCharacter={onSelectCharacter} />
            ))}
        </div>
    )
}

export default CharacterList

const Character = ({ item, onSelectCharacter, selectedId }) => {
    return (
        <div className="list__item" onClick={() => onSelectCharacter(item.id)}>
            <img src={item.image} alt={item.name} />
            <CharacterName item={item} />
            <CharacterInfo item={item} />
            <button className='icon red' >
               {selectedId===item.id? <EyeSlashIcon/>:  <EyeIcon />}
            </button>
        </div>
    )
}

const CharacterName = ({ item }) => {
    return (
        <h3 className="name">
            <span>{item.gender === "Male" ? "👨" : "👩"}</span>
            <span>{item.name}</span>
        </h3>
    )
}
const CharacterInfo = ({ item }) => {
    return (
        <div className="list-item__info info">
            <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
            <span> {item.status} </span>
            <span> - {item.species}</span>
        </div>
    )
}