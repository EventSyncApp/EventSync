// SpectatorsList.js
import React, { useState } from 'react';

const SpectatorsList = () => {
  const [spectators, setSpectators] = useState([]);
  const [newSpectator, setNewSpectator] = useState('');

  const handleAddSpectator = () => {
    if (newSpectator.trim()) {
      setSpectators([...spectators, newSpectator]);
      setNewSpectator('');
    }
  };

  return (
    <div>
      <h1>Meet Spectators List</h1>
      <input
        type="text"
        value={newSpectator}
        onChange={(e) => setNewSpectator(e.target.value)}
        placeholder="Enter spectator name"
      />
      <button onClick={handleAddSpectator}>Add Spectator</button>
      <ul>
        {spectators.map((spectator, index) => (
          <li key={index}>{spectator}</li>
        ))}
      </ul>
    </div>
  );
};

export default spectatorList;
