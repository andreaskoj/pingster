import React from 'react';
import './App.css';
import Stats from './stats/Stats';
import Matches from './matches/Matches';

let data =
    [
      {
        "Id": 1,
        "Player1": "Andreas",
        "Player2": "Magda",  
        "Score": "2:3",
      },
      {
        "Id": 2,
        "Player1": "Andreas",
        "Player2": "Magda",  
        "Score": "3:2",
      },
      {
        "Id": 3,
        "Player1": "Mike",
        "Player2": "Bob",  
        "Score": "0:3",
      },
      {
        "Id": 4,
        "Player1": "Victoria",
        "Player2": "Zoe",  
        "Score": "0:3",
      }
    ]

function App() {
  const [state, setState] = React.useState(data);

  return (
    <div className="App">
      <Stats data={state} />
      <Matches data = {state} setData = {setState} />
    </div>
  );
}

export default App;
