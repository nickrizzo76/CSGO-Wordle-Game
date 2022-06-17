import React, { useState, useEffect } from "react";
import './App.css';
var data = require('./db.json');

function App() {

  const initialPlayerState = {
    player_id: "",
    nick_name: "",
    nationality: "",
    player_url: "",
    rating: "",
    team: "",
    name: "",
    age: "",
    past_teams: [],
    majors: "",
    weapons: []
  }

  let [correctPlayer, setCorrectPlayer] = useState({...initialPlayerState})
  let [players, setPlayers] = useState([])


  
  useEffect(() => { 
    // randomly select the correct player
    const keys = Object.keys(data)
    const randomIndex = Math.floor(Math.random() * keys.length)
    const selectedPlayerId = keys[randomIndex] 
    setCorrectPlayer(data[selectedPlayerId])

    // turn json data into sorted array
    const players = keys.map(key => {
      const player = data[key]
      player['id'] = key
      return player
    })

    setPlayers(players.sort(function(a, b){ return a.nick_name.toLowerCase() > b.nick_name.toLowerCase() ? 1 : -1}))
  }, [])

  const options = players.map(player => <option key={player.id}>{player.nick_name}</option>)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Counter Strikle</h1>
        <p>CS:GO PLAYER GUESSING GAME</p>

        <select defaultValue="" id="playerOptionList">
          <option value="" disabled>CS:GO Players</option>
          {options}
        </select>
      </header>
    </div>
  );
}

export default App;
