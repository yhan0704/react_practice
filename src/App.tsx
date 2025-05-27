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

  console.log("todos", todos);
  console.log("isLoading", isLoading);
  console.log("isError", isError);

  if (isError) return <div>Error</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ margin: "auto", maxWidth: "700px", textAlign: "center" }}>
      <h1>Todo List</h1>
      {todos.map((todo) => (
        <div style={{ textAlign: "start" }}>
          <label>
            <input type="checkbox" />
            {todo.title}
          </label>
        </div>
      ))}
    </div>
  );
}

export default App;
