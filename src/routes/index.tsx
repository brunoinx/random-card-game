import { Routes, Route } from 'react-router-dom';

import { Home } from '../screens/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
