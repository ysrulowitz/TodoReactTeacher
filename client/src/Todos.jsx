import { useContext, useEffect, useState } from "react";
import Task from "./Task";
import NewTask from "./NewTask";
import Title from "./Title";
import AuthContext from "./auth";

export default function Todos({ userId }) {
  const [tasks, setTasks] = useState([]);
 useEffect(() => {
   const maybeTasks = localStorage.getItem('tasks')
  if (maybeTasks) {
    setTasks(JSON.parse(maybeTasks))
  }
 }
, [])
  const user = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function updateTasks(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  async function loadTasks() {
    let response = await fetch("http://localhost:3000/tasks", {
      credentials: "include"
    });
    const result = await response.json();
    setTasks(result);
  }

  async function removeTask(taskId) {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({userId: user})
      });

      const result = await response.json();
      console.log(result);

    setTasks(
      tasks.filter((task)=> task.id !==taskId)
    );
  };

  async function doneTask(taskId) {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({userId: user})
      });

      const result = await response.json();
      console.log(result);

      setTasks(
        tasks.map((task)=> 
          task.id === taskId ? { ...task, done: true } : task
          )
      );
  };

  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <>
      <div className="todo-container">
        <Title title={"Todos App"} />
        <NewTask updateTasks={loadTasks} />
        <section className="task-list" id="todo-list">
          <h2 className="task-header">Active tasks</h2>
          {tasks
            .filter((task) => !task.done)
            .map((task) => (
              <Task task={task} key={task.id} removeTask= {removeTask} doneTask={doneTask}/>
            ))}
        </section>
        <section className="task-list completed" id="done-list">
          <h2 className="task-header">Completed Tasks</h2>
          {tasks
            .filter((task) => task.done)
            .map((task) => (
              <Task task={task} key={task.id} removeTask= {removeTask} doneTask={doneTask}/>
            ))}
        </section>
      </div>
    </>
  );
}
