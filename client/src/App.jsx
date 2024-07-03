import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Todos from "./Todos";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthContext from "./auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // function setUser(user) {
  //   setCurrentUser(user);
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setCurrentUser={setCurrentUser} />,
    },
    {
      path: "/todos",
      element: <Todos />,
    }
  ]);
  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
      <AuthContext.Provider value={currentUser}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
