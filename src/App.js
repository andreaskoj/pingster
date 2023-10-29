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
