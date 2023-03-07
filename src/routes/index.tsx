import { Routes, Route } from 'react-router-dom';

import { Home } from '../screens/Home';
import { GameCards } from '../screens/GameCards';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<GameCards />} />
    </Routes>
  );
}
