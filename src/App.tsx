import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);
      try {
        const fetchedTodos = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const getData = await fetchedTodos.json();
        setTodos(getData.slice(0, 10));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchedData();
  }, []);

  if (isError) return <div>Error</div>;

  if (isLoading) return <div>Loading...</div>;

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

  return (
    <div style={{ margin: "auto", maxWidth: "700px", textAlign: "center" }}>
      <h1>Todo List</h1>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ textAlign: "start" }}>
            <label>
              <input type="checkbox" checked={todo.completed} />
              {todo.title}
            </label>
          </div>
          <button
            onClick={() => handleDelete(todo.id)}
            style={{ cursor: "pointer" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
