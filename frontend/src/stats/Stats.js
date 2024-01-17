import './Stats.css'
import React from 'react';
import './Stats.css';

function groupAndOrderByWinsAndLosses(data) {
  console.log(data);
    const playerStats = {};

    data.forEach((game) => {
      const player1Name = game.Player1.Name;
      const player2Name = game.Player2.Name;
  
      if (!playerStats[player1Name]) {
        playerStats[player1Name] = { Wins: 0, Losses: 0 };
      }
  
      if (!playerStats[player2Name]) {
        playerStats[player2Name] = { Wins: 0, Losses: 0 };
      }
  
      if (game.Player1.Score > game.Player2.Score) {
        playerStats[player1Name].Wins++;
        playerStats[player2Name].Losses++;
      }
      
      if (game.Player2.Score > game.Player1.Score) {
        playerStats[player2Name].Wins++;
        playerStats[player1Name].Losses++;
      }
    });
  
    const playerStatsArray = Object.keys(playerStats).map((name) => ({
      Name: name,
      Wins: playerStats[name].Wins,
      Losses: playerStats[name].Losses,
    }));
  
    playerStatsArray.sort((a, b) => b.Wins - a.Wins);
  
    return playerStatsArray;
  }

export default function Stats({ data }) {
  data = groupAndOrderByWinsAndLosses(data);

  return (
    <div className="stats">
      <h2>Stats</h2>
    
      {data.length === 0 ? (<div className="LoadingSpinner"></div>) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Wins</th>
              <th>Loses</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.Name}</td>
                <td>{item.Wins}</td>
                <td>{item.Losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}