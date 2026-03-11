import { Header } from './components/Header';
import { StatsPanel } from './components/StatsPanel';
import { TaskList } from './components/TaskList';
import { Calendar } from './components/Calendar';
import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks, streak, addTask, editTask, toggleTask, deleteTask } = useTasks();

  return (
    <div className="min-h-screen pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        <StatsPanel tasks={tasks} streak={streak} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="order-2 lg:order-1">
            <Calendar tasks={tasks} />
          </div>

          <div className="order-1 lg:order-2">
            <TaskList
              tasks={tasks}
              onAdd={addTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
