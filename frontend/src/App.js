import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './header/Header';
import Stats from './stats/Stats';
import Matches from './matches/Matches';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // delay for testing
        await new Promise(resolve => setTimeout(resolve, 3000));

        const response = await fetch('http://localhost:3001/data');

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
      <Header/>
      <Stats data={data} />
      <Matches data={data} setData={setData} />
    </div>
  );
}

export default App;
