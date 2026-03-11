import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { differenceInCalendarDays, startOfDay, parseISO } from 'date-fns';

export function useTasks() {
    const [tasks, setTasks] = useLocalStorage('productivity-tasks', []);
    const [streak, setStreak] = useLocalStorage('productivity-streak', { current: 0, longest: 0, lastActiveDate: null });

    // Update streak logic based on distinct days with completed tasks
    useEffect(() => {
        if (tasks.length === 0) return;

        const completedTasks = tasks.filter(t => t.completedAt);
        if (completedTasks.length === 0) {
            setStreak(prev => ({ ...prev, current: 0, lastActiveDate: null }));
            return;
        }

        // 1. Get distinct completed dates formatted as ISO strings at start of day
        const completedDates = [...new Set(completedTasks.map(t => startOfDay(parseISO(t.completedAt)).toISOString()))].sort();

        let tempStreak = 0;
        let maxStreak = 0;
        let prevDate = null;

        // 2. Compute streaks
        for (const dateStr of completedDates) {
            const currDate = new Date(dateStr);
            if (!prevDate) {
                tempStreak = 1;
            } else {
                const diffDays = differenceInCalendarDays(currDate, prevDate);
                if (diffDays === 1) {
                    tempStreak += 1;
                } else if (diffDays > 1) {
                    tempStreak = 1;
                }
            }
            if (tempStreak > maxStreak) maxStreak = tempStreak;
            prevDate = currDate;
        }

        // 3. Determine if current streak is still active
        let currentStreak = 0;
        const lastCompletedStr = completedDates[completedDates.length - 1];
        const lastCompletedDate = new Date(lastCompletedStr);
        const today = new Date();
        const daysFromToday = differenceInCalendarDays(today, lastCompletedDate);

        if (daysFromToday <= 1) {
            currentStreak = tempStreak;
        } else {
            currentStreak = 0;
        }

        setStreak(prev => ({
            current: currentStreak,
            longest: Math.max(prev.longest, maxStreak),
            lastActiveDate: lastCompletedStr
        }));

    }, [tasks, setStreak]);

    const addTask = (title) => {
        if (!title.trim()) return;
        const newTask = {
            id: uuidv4(),
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        // Add to top of list
        setTasks([newTask, ...tasks]);
    };

    const editTask = (id, newTitle) => {
        setTasks(tasks.map(t => (t.id === id ? { ...t, title: newTitle } : t)));
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => {
            if (t.id === id) {
                const isCompleting = !t.completed;
                return {
                    ...t,
                    completed: isCompleting,
                    completedAt: isCompleting ? new Date().toISOString() : null
                };
            }
            return t;
        }));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return { tasks, streak, addTask, editTask, toggleTask, deleteTask };
}
