import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/todoPage.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function AdminPage() {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://localhost:7028/api/todo/getAll", {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log("Hata oluştu");
      });
  }, [token]);

  function handleLogout() {
    const confirmed = window.confirm("Are you sure want to logout?");

    if (confirmed) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2>
                Admin <b>Panel</b>
              </h2>
            </div>
            <div className="col-sm-6">
              <button className="btn btn-danger" onClick={handleLogout}>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{formatDate(todo.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
