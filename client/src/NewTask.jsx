import { useContext } from "react";
import AuthContext from "./auth";

export default function NewTask({ updateTasks }) {
  const userId = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.target.elements.title.value,
        user_id: userId,
      }),
    });
    updateTasks();
    event.target.elements.title.value = "";
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Add a new task"
        />
        <button className="add-task" type="submit">
          +
        </button>
      </form>
    </>
  );
}
