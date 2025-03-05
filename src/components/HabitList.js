import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addHabit, toggleHabit, deleteHabit, resetDailyHabits } from '../features/habitsSlice';
import { logout } from '../features/authSlice';

const HabitList = () => {
    const [newHabitName, setNewHabitName] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const habits = useSelector(state => state.habits.habits);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetDailyHabits());
        const interval = setInterval(() => {
            dispatch(resetDailyHabits());
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newHabitName.trim()) {
            dispatch(addHabit({ name: newHabitName, frequency }));
            setNewHabitName('');
        }
    };

    const handleToggle = (habitId) => {
        dispatch(toggleHabit(habitId));
    };

    const handleDelete = (habitId) => {
        dispatch(deleteHabit(habitId));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-row justify-between items-center py-3">
                        <div className="text-lg font-bold text-blue-600">Alışkanlık Takipçisi</div>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-600 text-sm hidden sm:inline">{user?.email}</span>
                            <button
                                onClick={() => dispatch(logout())}
                                className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600"
                            >
                                Çıkış
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-xl mx-auto px-4 pt-16 pb-6">
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <h2 className="text-lg font-semibold mb-3">Yeni Alışkanlık Ekle</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={newHabitName}
                                onChange={(e) => setNewHabitName(e.target.value)}
                                placeholder="Yeni alışkanlık ekle..."
                                className="w-full p-2.5 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                            />
                            <div className="flex gap-2">
                                <select
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    className="flex-1 p-2.5 border rounded text-base bg-white"
                                >
                                    <option value="daily">Günlük</option>
                                    <option value="weekly">Haftalık</option>
                                </select>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-6 py-2.5 rounded hover:bg-blue-600 text-base min-w-[100px]"
                                >
                                    Ekle
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="space-y-3">
                    {habits.map(habit => (
                        <div
                            key={habit.id}
                            className="bg-white rounded-lg shadow p-4"
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={habit.completed}
                                    onChange={() => handleToggle(habit.id)}
                                    className="mt-1.5 w-5 h-5"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-semibold text-base">{habit.name}</h3>
                                        <button
                                            onClick={() => handleDelete(habit.id)}
                                            className="text-red-500 hover:text-red-700 text-sm px-2 py-1"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {habit.frequency === 'daily' ? 'Günlük' : 'Haftalık'} -
                                        Seri: {habit.streak} gün
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HabitList;