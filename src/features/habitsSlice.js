import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    habits: [],
};

export const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabit: (state, action) => {
            state.habits.push({
                id: Date.now(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completed: false,
                streak: 0,
                lastCompleted: null,
            });
        },
        toggleHabit: (state, action) => {
            const habit = state.habits.find(h => h.id === action.payload);
            if (habit) {
                habit.completed = !habit.completed;
                if (habit.completed) {
                    habit.streak += 1;
                    habit.lastCompleted = new Date().toISOString();
                }
            }
        },
        deleteHabit: (state, action) => {
            state.habits = state.habits.filter(habit => habit.id !== action.payload);
        },
    },
});

export const { addHabit, toggleHabit, deleteHabit } = habitsSlice.actions;
export default habitsSlice.reducer; 