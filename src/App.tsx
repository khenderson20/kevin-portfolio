import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [client, setClient] = useState<ReturnType<typeof generateClient<Schema>> | null>(null);

  useEffect(() => {
    const amplifyClient = generateClient<Schema>();
    setClient(amplifyClient);
    
    amplifyClient.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    if (client) {
      client.models.Todo.create({ content: window.prompt("Todo content") });
    }
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
