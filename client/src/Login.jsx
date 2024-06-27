import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const usernameElem = useRef(null);
  const passwordElem = useRef(null);
  async function submitHandler(event) {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      }),
    });
    const result = await res.json();
    setCurrentUser(result.user_id);
    console.log(result.user_id)
    navigate("/todos", { state: { userId: result.user_id } });
  }

  async function handleSignUp(event) {
    event.preventDefault();
    const username = usernameElem.current.value;
    const password = passwordElem.current.value;

    const res = await fetch("http://localhost:3000/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    });
    const result = await res.json();
    // navigate("/todos", {state: { userId: result.user_id}})
  }

  return (
    <>
      <form className="login-form" onSubmit={submitHandler}>
        <section className="login-form__username">
          {" "}
          <label htmlFor="username">Username</label>
          <input
            ref={usernameElem}
            id="username"
            name="username"
            type="text"
          ></input>
        </section>
        <section className="login-form__password">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordElem}
            id="password"
            name="password"
            type="password"
          ></input>
        </section>
        <section className="login-form__actions">
          <button type="submit">Log In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </section>
      </form>
    </>
  );
}

export default Login;
