import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
    if (name === "") return "";
    else setTaskList(newTaskList);
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
    <div className="container-sm">
      <form className="col-5" onSubmit={handleSubmit}>
        <input
          className="form-control mt-3"
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          autoFocus
        ></input>
        <button className="btn btn-primary my-3">Add</button>
      </form>
      {taskList.map((t: ITask, i: number) => {
        console.log(taskList);

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
    </div>
  );
}

export default App;
