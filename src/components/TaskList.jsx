import { useState } from 'react';
import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';
import { TaskFilters } from './TaskFilters';
import { ListTodo } from 'lucide-react';

export function TaskList({ tasks, onAdd, onToggle, onDelete }) {
    const [filter, setFilter] = useState('all');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const counts = {
        all: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length
    };

    return (
        <div className="bg-card w-full border border-border rounded-3xl p-6 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <ListTodo className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Tasks</h2>
            </div>

            <TaskInput onAdd={onAdd} />

            {tasks.length > 0 && (
                <TaskFilters filter={filter} setFilter={setFilter} counts={counts} />
            )}

            <div className="mt-4 min-h-[200px]">
                {filteredTasks.length > 0 ? (
                    <div className="space-y-1">
                        {filteredTasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={onToggle}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground bg-muted/20 border border-dashed border-border rounded-2xl">
                        <ListTodo className="w-12 h-12 mb-3 opacity-30" />
                        <p className="text-sm font-medium">
                            {filter === 'completed'
                                ? "No completed tasks yet."
                                : filter === 'pending'
                                    ? "No pending tasks! You're all caught up."
                                    : "No tasks yet. Add one above!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
