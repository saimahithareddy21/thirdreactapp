import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const API_BASE = "http://localhost:3500";
  let [todos, setTodos] = useState([]);
  const [popupActive, setPopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    getTodos();
  }, []);
  let getTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  };
  let completeTodo = async (id) => {
    const dat = await fetch(`${API_BASE}/update-todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Fetch PUT Request Example" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo._id === data._id) {
              todo.complete = data.complete;
            }

            return todo;
          })
        );
      })
      .catch((err) => {
        console.log("error in put ", err);
      });
  };

  let deleteTodo = async (id, text) => {
    let data = await fetch(`${API_BASE}/delete-todo/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((dat) => {
        return dat;
      })
      .catch((err) => console.log(err));
    prompt("deleting ", text, "from your todos");
    console.log(data);
    getTodos();
  };
  let addTodo = async () => {
    let data = await fetch(`${API_BASE}/add-todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("error in post ", err);
      });
    prompt("Adding ", newTodo, "to your todos");
    todos.push(data);
    setTodos(todos);
    setPopup(false);
    setNewTodo("");
  };
  return (
    <div className="app">
      <h1 className="display-5">Welcome, Mahitha</h1>
      <h4 className="task-heading">Your Tasks</h4>

      <div className="todos">
        {todos.length > 0
          ? todos.map((todo) => (
              <div
                className={`todo ${todo.complete ? "is-complete" : ""}`}
                key={todo._id}
              >
                <div
                  className="checkbox"
                  onClick={() => {
                    completeTodo(todo._id);
                  }}
                ></div>
                <div className="text">{todo.text}</div>
                <div
                  className="delete-todo"
                  onClick={() => deleteTodo(todo._id, todo.text)}
                >
                  X
                </div>
              </div>
            ))
          : "you donot have any todos"}
      </div>

      <div className="button" onClick={() => setPopup(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div
            className="Closepopup"
            onClick={() => {
              setPopup(false);
            }}
          >
            X
          </div>
          <div className="content">
            <h4 className="add-tasks">Add Tasks</h4>
            {/* {newTodo} */}
            <div className="input-sur">
              <input
                className=" form-control input"
                type="text"
                placeholder="Enter your tasks"
                onChange={(e) => {
                  setNewTodo(e.target.value);
                }}
                value={newTodo}
              />
            </div>
            <button
              className="addbut"
              onClick={() => {
                addTodo();
              }}
            >
              ADD
            </button>
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default App;
