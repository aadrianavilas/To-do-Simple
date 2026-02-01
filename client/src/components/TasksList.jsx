import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";

export function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState(false)

  useEffect(() => {
    loadTasks(false);
  }, []);

  async function loadTasks(done) {
    const res = await getTasks(done);
    setActiveTab(done)
    setTasks(res.data);
  }

  return (
    <div>
      <div className="grid grid-cols-2 mb-2 bg-yellow-50">
        <div
          className={`${activeTab==false?"bg-zinc-700":"bg-zinc-800"} cursor-pointer hover:bg-zinc-700 w-full p-5`}
          onClick={() => loadTasks(false)}
        >
          Tareas Pendientes
        </div>
        <div
          className={`${activeTab===true?"bg-zinc-700":"bg-zinc-800"} cursor-pointer hover:bg-zinc-700 w-full p-5`}
          onClick={() => loadTasks(true)}
        >
          Tareas Completadas
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
