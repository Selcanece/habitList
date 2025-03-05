import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addHabit, toggleHabit, deleteHabit } from '../features/habitsSlice';
import { logout } from '../features/authSlice';

const HabitList = () => {
    const [newHabitName, setNewHabitName] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const habits = useSelector(state => state.habits.habits);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newHabitName.trim()) {
            dispatch(addHabit({ name: newHabitName, frequency }));
            setNewHabitName('');
        }
    };

    return (
        <div>
            {/* Header */}
            <nav className="bg-white shadow-lg mb-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-xl font-bold text-blue-600">Alışkanlık Takipçisi</div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">{user?.email}</span>
                            <button
                                onClick={() => dispatch(logout())}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Çıkış Yap
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Günlük Alışkanlıklarım</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Yeni Alışkanlık Ekle</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newHabitName}
                                onChange={(e) => setNewHabitName(e.target.value)}
                                placeholder="Yeni alışkanlık ekle..."
                                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <select
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="daily">Günlük</option>
                                <option value="weekly">Haftalık</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Ekle
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-4">
                    {habits.map(habit => (
                        <div
                            key={habit.id}
                            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                        >
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={habit.completed}
                                    onChange={() => dispatch(toggleHabit(habit.id))}
                                    className="w-5 h-5"
                                />
                                <div>
                                    <h3 className="font-semibold">{habit.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {habit.frequency === 'daily' ? 'Günlük' : 'Haftalık'} -
                                        Seri: {habit.streak} gün
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch(deleteHabit(habit.id))}
                                className="text-red-500 hover:text-red-700"
                            >
                                Sil
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HabitList; 