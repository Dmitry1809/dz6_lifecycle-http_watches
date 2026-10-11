import React, { useState } from 'react';
import type { ClockModel } from '../App';

interface WorldClockFormProps {
  onAddClock: (clock: ClockModel) => void;
}

export const WorldClockForm: React.FC<WorldClockFormProps> = ({ onAddClock }) => {
  const [name, setName] = useState('');
  const [zone, setZone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || zone === '') return;

    const zoneNumber = parseFloat(zone);
    if (isNaN(zoneNumber) || zoneNumber < -12 || zoneNumber > 14) {
      alert('Пожалуйста, введите корректную временную зону (от -12 до +14)');
      return;
    }

    onAddClock({
      id: Date.now().toString(),
      name: name.trim(),
      zone: zoneNumber,
    });

    setName('');
    setZone('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '12px' }}>Название</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="например, Лондон"
          required
        />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '12px' }}>Временная зона (UTC)</label>
        <input
          type="number"
          step="0.5"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          placeholder="например, -5 или 3"
          required
        />
      </div>
      <button type="submit" style={{ alignSelf: 'flex-end', height: '36px' }}>
        Добавить
      </button>
    </form>
  );
};
