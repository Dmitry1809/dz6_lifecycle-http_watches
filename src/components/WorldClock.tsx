import React, { useState, useEffect } from 'react';
import type { ClockModel } from '../App';

interface WorldClockProps {
  clock: ClockModel;
  onDelete: (id: string) => void;
}

export const WorldClock: React.FC<WorldClockProps> = ({ clock, onDelete }) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Вычисляем UTC-время в миллисекундах
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      // Вычисляем локальное время для переданной временной зоны
      const cityTime = new Date(utc + clock.zone * 3600000);
      
      setTimeStr(cityTime.toLocaleTimeString('ru-RU', { hour12: false }));
    };

    // Запускаем сразу при монтировании
    updateClock();

    // Каждую секунду обновляем состояние
    const timerId = setInterval(updateClock, 1000);

    // Очистка интервала при размонтировании (удалении часов)
    return () => {
      clearInterval(timerId);
    };
  }, [clock.zone]); // Перезапустится, если зона изменится

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px 15px',
      borderRadius: '5px',
      position: 'relative',
      minWidth: '150px',
      textAlign: 'center'
    }}>
      <button 
        onClick={() => onDelete(clock.id)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: 'none',
          border: 'none',
          color: 'red',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ✘
      </button>
      <h4 style={{ margin: '0 0 5px 0' }}>{clock.name}</h4>
      <div style={{ fontSize: '20px', fontFamily: 'monospace' }}>{timeStr || '--:--:--'}</div>
    </div>
  );
};
