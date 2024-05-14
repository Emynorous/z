// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data.json';

function App() {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState({
    group: '',
    date: '',
    team: ''
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Simulace načítání dat z externího zdroje
    setMatches(data.matches);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleModeChange = () => {
    setDarkMode(!darkMode);
  };

  const filteredMatches = matches.filter(match => {
    return (
      (filter.group === '' || match.group === filter.group) &&
      (filter.date === '' || match.date === filter.date) &&
      (filter.team === '' || match.team1 === filter.team || match.team2 === filter.team)
    );
  });

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <h1>Hokejové mistrovství světa 2024</h1>
      <div className="filters">
        <label>
          Skupina:
          <input type="text" name="group" value={filter.group} onChange={handleFilterChange} />
        </label>
        <label>
          Datum:
          <input type="text" name="date" value={filter.date} onChange={handleFilterChange} />
        </label>
        <label>
          Tým:
          <input type="text" name="team" value={filter.team} onChange={handleFilterChange} />
        </label>
      </div>
      <button onClick={handleModeChange}>{darkMode ? 'Světlý režim' : 'Tmavý režim'}</button>
      <table>
        <thead>
          <tr>
            <th>Zápas</th>
            <th>Datum</th>
            <th>Výsledek</th>
          </tr>
        </thead>
        <tbody>
          {filteredMatches.map(match => (
            <tr key={match.id}>
              <td>{`${match.team1} vs ${match.team2}`}</td>
              <td>{match.date}</td>
              <td>{`${match.score1} - ${match.score2}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
