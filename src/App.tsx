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
    <div className="container">
      <form className="row justify-content-center" onSubmit={handleSubmit}>
        <input
          className="form-control col-4 mt-3 .bg-success"
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          autoFocus
        ></input>
        <button className="btn btn-primary col-1 m-3">Add</button>
      </form>

      {taskList.map((t: ITask, i: number) => {
        return (
          <div className="row justify-content-center bg-info p-3 border">
            <div className="col-4 ml-5 " key={i}>
              <h3 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h3>
            </div>
            <div className="col-2">
              <label className="">
                <input type="checkbox" onChange={(e) => toggleTaskStatus(i)} />
              </label>
              <button
                className="btn btn-warning ml-2"
                onClick={(e) => clearTask(i)}
              >
                🗑️
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
