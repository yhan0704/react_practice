import { ChangeEvent, useState } from "react";
import { Todo } from "../utils/types";

type TodosProps = {
  todos: Todo[];
  setTodos: Function;
};

function Todos({ todos, setTodos }: TodosProps) {
  const [textValue, setTextvalue] = useState("");

  const handleDelete = async (id: number) => {
    try {
      const isDeleted = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (isDeleted.ok) {
        setTodos(todos.filter((i) => i.id !== id));
      }
    } catch (error) {
      console.log("delete fail", error);
    }
  };

  const handleOnClick = async (todo: Todo) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !todo.completed }),
        }
      );

      if (res.ok) {
        const result = todos.map((res) =>
          res.id === todo.id ? { ...res, completed: !todo.completed } : res
        );
        setTodos(result);
      }
    } catch (error) {
      console.log("delete fail", error);
    }
  };

  const handleCreateTodo = (text: string) => {
    console.log(text);
    setTextvalue("");
  };

  return (
    <>
      <input
        type="text"
        value={textValue}
        onChange={(e) => setTextvalue(e.target.value)}
      />
      <button
        onClick={() => handleCreateTodo(textValue)}
        style={{ cursor: "pointer" }}
      >
        Create
      </button>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ textAlign: "start" }}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => handleOnClick(todo)}
                readOnly
              />
              {todo.title}
            </label>
          </div>
          <div>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{ cursor: "pointer" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Todos;
