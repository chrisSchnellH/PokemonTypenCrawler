import React, { useState } from 'react';
import axios from 'axios';
import TypFinder from './components';

function App() {
  const [pokemon, setPokemon] = useState('');
  const [typen, setTypen] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setPokemon(e.target.value);
  };

  const fetchData = async () => {
    try {
      setError('');
      const response = await axios.get(`http://localhost:8080/api/typen/${pokemon}`);
      setTypen(response.data);
      console.log(response.data);
    } catch (error) {
      setError('Fehler beim Laden der Typen.');
      console.error('Fehler beim Laden der Typen:', error);
    }
  };

  return (
    <div className="App">
      <TypFinder />
    </div>
  );
}

export default App;