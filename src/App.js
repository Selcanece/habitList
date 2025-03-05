import React from 'react';
import { useSelector } from 'react-redux';
import HabitList from './components/HabitList';
import LandingPage from './components/LandingPage';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? <HabitList /> : <LandingPage />}
    </div>
  );
}

export default App;
