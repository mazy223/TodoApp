import Login from "./components/Login";
import TodoPage from "./components/TodoPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import { useState } from "react";

function App() {
  /* Axios.get("https://localhost:7028/api/todo")
      .then((res) => {
        console.log(res.data);
      }); */
  const [token,setToken] = useState(localStorage.getItem("token") || null);
 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setToken={setToken}/>,
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/todoPage",
      element: (
        <TodoPage token={token}/>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
