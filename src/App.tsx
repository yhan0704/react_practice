import { useEffect, useState } from "react";
import Todos from "./todos/Todos";
import { Todo } from "./utils/types";

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

  return (
    <div style={{ margin: "auto", maxWidth: "700px", textAlign: "center" }}>
      <h1>Todo List</h1>
      <Todos todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
