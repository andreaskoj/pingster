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
    //extract to a service
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3001/matches');
       
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

    fetchMatches();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App"> 
      <Header/>
      <Stats data={data} isLoading={isLoading}/>
      <Matches data={data} setData={setData} isLoading={isLoading} />
    </div>
  );
}

export default App;
