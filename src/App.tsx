import { useState } from 'react';
import { WorldClockForm } from './components/WorldClockForm';
import { WorldClockList } from './components/WorldClockList';

export interface ClockModel {
  id: string;
  name: string;
  zone: number;
}

function App() {
  // Начальное состояние с дефолтными городами (по желанию)
  const [clocks, setClocks] = useState<ClockModel[]>([
    { id: '1', name: 'Москва', zone: 3 },
    { id: '2', name: 'Лондон', zone: 0 },
    { id: '3', name: 'Нью-Йорк', zone: -5 },
  ]);

  const handleAddClock = (newClock: ClockModel) => {
    setClocks((prevClocks) => [...prevClocks, newClock]);
  };

  const handleDeleteClock = (id: string) => {
    setClocks((prevClocks) => prevClocks.filter((clock) => clock.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Мировые часы</h2>
      <WorldClockForm onAddClock={handleAddClock} />
      <WorldClockList clocks={clocks} onDeleteClock={handleDeleteClock} />
    </div>
  );
}

export default App;
