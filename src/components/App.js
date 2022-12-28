import React, { useState } from "react";
import "../styles/App.css";

function App() {
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [editedTask, setEditedTask] = useState("");

  //To add task
  function handleTaskSubmit(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      todo: task,
    };

    if (task == null || task === "") return;
    else setTaskList([...taskList, newTask]);
    setTask("");
  }

  //To delete task
  function handleDeleteButton(id) {
    const UpdatedTaskLIst = taskList.filter((task) => task.id !== id);
    setTaskList(UpdatedTaskLIst);
  }

  //to edit task
  function handleEditButton(id) {
    const UpdatedTaskLIst = [...taskList].map((task) => {
      if (task.id === id) {
        task.todo = editedTask;
      }
      return task;
    });
    setTaskList(UpdatedTaskLIst);
    setSelectedId(null);
    setEditedTask("");
  }

  return (
    <div id="main">
      <form>
        <textarea
          id="task"
          type="text"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          placeholder="Enter new Task"
        />
        <button id="btn" type="submit" onClick={handleTaskSubmit}>
          Submit
        </button>
      </form>

      {/*to-do list */}
      <ul>
        {taskList.map((task) => {
          return (
            <>
              {selectedId !== task.id ? (
                <li className="list" key={task.id}>
                  {task.todo}
                </li>
              ) : (
                <textarea
                  className="editTask"
                  type="text"
                  value={editedTask}
                  placeholder={task.todo}
                  onChange={(e) => {
                    setEditedTask(e.target.value);
                  }}
                />
              )}

              <button
                onClick={() => handleDeleteButton(task.id)}
                className="delete"
              >
                delete
              </button>
              {selectedId === task.id ? (
                <button
                  className="saveTask"
                  onClick={() => handleEditButton(task.id)}
                  disabled={
                    editedTask === "" || editedTask === null ? true : false
                  }
                >
                  Done
                </button>
              ) : (
                <>
                  <button
                    className="edit"
                    onClick={() => {
                      setSelectedId(task.id);
                    }}
                  >
                    Edit
                  </button>
                  <br />
                </>
              )}
            </>
          );
        })}
      </ul>
      {/* list ends here */}
    </div>
  );
}

export default App;
