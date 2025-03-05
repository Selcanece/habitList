import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

// Async thunks
export const fetchHabits = createAsyncThunk(
    'habits/fetchHabits',
    async (userId) => {
        const q = query(collection(db, 'habits'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const habits = [];
        querySnapshot.forEach((doc) => {
            habits.push({ id: doc.id, ...doc.data() });
        });
        return habits;
    }
);

export const addHabitToFirebase = createAsyncThunk(
    'habits/addHabitToFirebase',
    async ({ name, frequency, userId }) => {
        const docRef = await addDoc(collection(db, 'habits'), {
            name,
            frequency,
            completed: false,
            streak: 0,
            userId,
            createdAt: new Date().toISOString()
        });
        return {
            id: docRef.id,
            name,
            frequency,
            completed: false,
            streak: 0,
            userId
        };
    }
);

export const toggleHabitInFirebase = createAsyncThunk(
    'habits/toggleHabitInFirebase',
    async (habitId) => {
        const habitRef = doc(db, 'habits', habitId);
        const habit = (await getDocs(query(collection(db, 'habits'), where('__name__', '==', habitId)))).docs[0].data();
        await updateDoc(habitRef, {
            completed: !habit.completed,
            streak: !habit.completed ? habit.streak + 1 : habit.streak
        });
        return habitId;
    }
);

export const deleteHabitFromFirebase = createAsyncThunk(
    'habits/deleteHabitFromFirebase',
    async (habitId) => {
        await deleteDoc(doc(db, 'habits', habitId));
        return habitId;
    }
);

const initialState = {
    habits: [],
    status: 'idle',
    error: null,
    lastResetDate: new Date().toDateString()
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
        resetDailyHabits: (state) => {
            const today = new Date();
            const todayString = today.toDateString();
            const isMonday = today.getDay() === 1; // 1 = Pazartesi

            if (state.lastResetDate !== todayString) {
                state.habits = state.habits.map(habit => {
                    // Günlük alışkanlıkları her gün sıfırla
                    if (habit.frequency === 'daily') {
                        if (!habit.completed) {
                            habit.streak = 0;
                        }
                        return {
                            ...habit,
                            completed: false
                        };
                    }

                    // Haftalık alışkanlıkları sadece Pazartesi günü sıfırla
                    if (habit.frequency === 'weekly' && isMonday) {
                        // Eğer geçen hafta tamamlanmadıysa seriyi sıfırla
                        if (!habit.completed) {
                            habit.streak = 0;
                        }
                        return {
                            ...habit,
                            completed: false
                        };
                    }

                    return habit;
                });
                state.lastResetDate = todayString;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHabits.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHabits.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.habits = action.payload;
            })
            .addCase(fetchHabits.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addHabitToFirebase.fulfilled, (state, action) => {
                state.habits.push(action.payload);
            })
            .addCase(toggleHabitInFirebase.fulfilled, (state, action) => {
                const habit = state.habits.find(h => h.id === action.payload);
                if (habit) {
                    habit.completed = !habit.completed;
                    if (habit.completed) {
                        habit.streak += 1;
                    }
                }
            })
            .addCase(deleteHabitFromFirebase.fulfilled, (state, action) => {
                state.habits = state.habits.filter(habit => habit.id !== action.payload);
            });
    }
});

export const { addHabit, toggleHabit, deleteHabit, resetDailyHabits } = habitsSlice.actions;
export default habitsSlice.reducer; 