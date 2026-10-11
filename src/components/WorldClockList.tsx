import React from 'react';
import type { ClockModel } from '../App';
import { WorldClock } from './WorldClock';

interface WorldClockListProps {
  clocks: ClockModel[];
  onDeleteClock: (id: string) => void;
}

export const WorldClockList: React.FC<WorldClockListProps> = ({ clocks, onDeleteClock }) => {
  if (clocks.length === 0) {
    return <p style={{ color: '#666' }}>Список часов пуст. Добавьте свой первый город!</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
      {clocks.map((clock) => (
        <WorldClock 
          key={clock.id} 
          clock={clock} 
          onDelete={onDeleteClock} 
        />
      ))}
    </div>
  );
};
