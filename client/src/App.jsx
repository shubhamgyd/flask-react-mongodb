import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Task } from "./components/Task";

function App() {
  const [tasks, setTasks] = useState([]);
  let inputRef = useRef();

  const getTodos = async () => {
    const temp = await fetch("http://127.0.0.1:5000/todos", {
      method: "GET",
    });
    const data = await temp.json();
    console.log(data);
    setTasks(() => data);
  }

  useEffect(() => {
    getTodos();
  }, []);

  const handleAddButton = async () => {
    if (inputRef.current.value !== "") {
      let taskToAdd = {
        "task": inputRef.current.value
      }

      let response = await fetch("http://127.0.0.1:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToAdd),
      })
      console.log(response);
      if (response.ok) {
        getTodos()
      }
    }
  }

  const handleDeleteButton = async (id) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      console.log("Deleted Successfully")
      getTodos();
    }
  }

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <div className="w-[50vw]">
        <div class="container flex justify-center w-full p-2">
          <div className="w-[20vw] flex justify-between">
          <input type="text" className="w-[15vw] h-2vh p-2 border-2" ref={inputRef}></input>
          <button type="text" className="p-1 border-1 w-[4vw] rounded-lg hover:bg-red-500 hover:text-white" onClick={handleAddButton}>Add</button>
          </div>
        </div>
        <div>
          {tasks.map(({ _id, task }) => (
            <Task key={_id.$oid} id={_id.$oid} task={task} handleDeleteButton={handleDeleteButton}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
