import React, { useState, useEffect } from 'react';
import './App.css';
import Stats from './stats/Stats';
import Matches from './matches/Matches';

let initData =
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
  }
]

function App() {
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {

    console.log("TEST")
    const fetchData = async () => {
      try {
        console.log("TEST")
        const response = await fetch('/data');

        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="App">
      <Stats data={data} />
      <Matches data={data} setData={setData} />
    </div>
  );
}

export default App;
