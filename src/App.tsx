import React, { useState } from "react";
import "./App.css";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  const addTask = (name: string) => {
    const newTaskList = [...taskList, { name, done: false }];
    setTaskList(newTaskList);
  };

  const toggleTaskStatus = (i: number) => {
    const newTaskList: ITask[] = [...taskList];
    newTaskList[i].done = !newTaskList[i].done;
    setTaskList(newTaskList);
  };

  const clearTask = (i: number) => {
    const newTaskList: ITask[] = [...taskList];
    newTaskList.splice(i, 1);
    setTaskList(newTaskList);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          autoFocus
        ></input>
        <button>Confirm</button>
      </form>
      {taskList.map((t: ITask, i: number) => {
        return (
          <div key={i}>
            <h3 style={{ textDecoration: t.done ? "line-through" : "" }}>
              {t.name}
            </h3>
            <label className="switch">
              <input type="checkbox" onChange={(e) => toggleTaskStatus(i)} />
              <span className="slider slider-round"></span>
            </label>
            <button onClick={(e) => clearTask(i)}>🗑️</button>
          </div>
        );
      })}
    </>
  );
}

export default App;
