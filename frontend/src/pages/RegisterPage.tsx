import { TextField, Button, Box, Typography } from "@mui/material";
import { useRef, type FormEvent } from "react";
import { BASE_URL } from "../constants/baseUrl";

interface IRegister {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!nameRef.current || !emailRef.current || !passwordRef.current) return;

    const formData: IRegister = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    }
    register(formData);
  }

  const register = async (formData: IRegister) => {
    try {
      const res = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
      console.log(await res.json());

      if(res.ok) {

        if(!nameRef.current || !emailRef.current || !passwordRef.current) return;
        
        nameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
      }
    
    } catch (error) {
      console.log(error);
    }
  }

  return ( <>
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        p: 4,
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "auto"
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <TextField inputRef={nameRef} label="Name" name="name" fullWidth />
      <TextField inputRef={emailRef} label="Email" type="email" name="email" fullWidth />
      <TextField inputRef={passwordRef} label="Password" type="password" name="password" fullWidth />
      <Button variant="outlined" type="submit" sx={{ mt: 2, width: "50%" }}>
        Submit
      </Button>
    </Box>
  </> );
}

export default RegisterPage;