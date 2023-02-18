import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuthContext();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    login({ email, password });
    resetForm();
    e.preventDefault();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;
