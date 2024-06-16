import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Todo() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("https://localhost:7018/api/TodoItems");
    setTodos(result.data);
    console.log(result.data);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7018/api/TodoItems", {
        id,
        title,
        description,
        status,
      });
      alert("Todo List Add Successfully");
      setId("");
      setTitle("");
      setDescription("");
      setStatus("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function edittodoItem(todo: any) {
    setId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setStatus(todo.status);
  }

  async function deletetodoItem(id: string) {
    try {
      await axios.delete(`https://localhost:7018/api/TodoItems/${id}`);
      alert("Todo item deleted successfully");
      clearForm();
      Load();
    } catch (error) {
      //alert("Error deleting todo: " + error.message);
    }
  }

  function clearForm() {
    setId("");
    setTitle("");
    setDescription("");
    setStatus("");
  }

  async function update(event: FormEvent) {
    event.preventDefault();
    try {
      console.log("Updating item with ID:", id);
      const response = await axios.put(`https://localhost:7018/api/TodoItems/${id}`, {
        id, // Include the id in the payload if using PUT
        title,
        description,
        status,
      });
      console.log("Update response:", response.data);
      alert("Item Updated");
      setId("");
      setTitle("");
      setDescription("");
      setStatus("");
      Load();
    } catch (err) {
      //alert("Error updating todo: " + err.message);
    }
  }
  

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>TODO List</h1>

      <div className="container mt-4">
        <form onSubmit={update}> {/* Add onSubmit handler */}
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              value={id}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setId(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              value={status}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setStatus(event.target.value)}
            />
          </div>
          <div>
  <button className="btn btn-primary mt-4" onClick={save} style={{ width: "90px", marginRight: "10px" }}>
    Save
  </button>
  <button className="btn btn-warning mt-4" type="submit" style={{ width: "90px" }}>
    Update
  </button>
</div>

        </form>
      </div>
      <br />
      <table className="table table-dark" style={{ width: "80%", margin: "0 auto" }}>
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Status</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {todos.map((todo) => (
      <tr key={todo.id}>
        <th scope="row">{todo.id}</th>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{todo.status}</td>
        <td>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => edittodoItem(todo)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deletetodoItem(todo.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Todo;
