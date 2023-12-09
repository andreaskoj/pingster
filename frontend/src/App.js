import React, { useState, useEffect } from 'react';
import './App.css';
import Stats from './stats/Stats';
import Matches from './matches/Matches';

let initData = [];

function App() {
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // Add a delay of 5 seconds
        //await new Promise(resolve => setTimeout(resolve, 3000));

        const response = await fetch('/data');

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
