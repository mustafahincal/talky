import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthContext } from "../../contexts/AuthContext";
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [show, setShow] = useState<boolean>(false);

  const { register } = useAuthContext();

  const handleClickShow = () => {
    setShow((prev) => !prev);
  };

  const handleUploadImage = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const fileToSet: File = (target.files as FileList)[0];
    setFile(fileToSet);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData: any = new FormData();
    formData.append("file", file);
    formData.append("registerBody", JSON.stringify({ name, email, password }));
    register(formData);
    //register({ name, email, password });
    resetForm();
    e.preventDefault();
  };

  const resetForm = () => {
    setName("");
    setConfirmPassword("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e: any) => handleUploadImage(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUp;
