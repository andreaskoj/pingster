import React from 'react';
import './App.css';
import Stats from './stats/Stats';
import Matches from './matches/Matches';

let data =
  [
    {
      "Id": 1,
      "Player1": 
              { 
                "Name": "Magda",
                "Score": 2, 
              },
      "Player2": 
        	    { 
                "Name": "Andreas",
                "Score": 3, 
               },
      "Date" :"2023-11-04"
    },
    {
      "Id": 2,
      "Player1": 
              { 
                "Name": "Magda",
                "Score": 3, 
              },
      "Player2": 
        	    { 
                "Name": "Andreas",
                "Score": 2, 
               },
      "Date" :"2023-11-04"
    },
    {
      "Id": 3,
      "Player1": 
              { 
                "Name": "Magda",
                "Score": 3, 
              },
      "Player2": 
        	    { 
                "Name": "Andreas",
                "Score": 2, 
               },
      "Date" :"2023-11-04"
    }
  ]

function App() {
  const [state, setState] = React.useState(data);

  return (
    <div className="App">
      <Stats data={state} />
      <Matches data={state} setData={setState} />
    </div>
  );
}

export default App;
