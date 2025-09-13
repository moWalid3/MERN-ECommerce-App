import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useRef, useState, type FormEvent } from "react";
import { useAuth } from "../context/auth/AuthContext";
import type { IRegisterForm } from "../types/Auth";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/loading/LoadingContext";

const RegisterPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [validationErrors, setValidationErrors] = useState<{msg: string, path: string | number}[]>([]);
  const [generalErrors, setGeneralErrors] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const { register } = useAuth();
  const { setIsLoading } = useLoading();

  const registerSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(100).required().messages({
      "string.min": "Name must have at least 3 characters",
      "string.max": "Name cannot exceed 100 characters",
      "string.empty": "Name is required",
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(3).required().messages({
      "string.min": "Password must have at least 3 characters",
      "string.empty": "password is required",
    }),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!nameRef.current || !emailRef.current || !passwordRef.current) {
      setGeneralErrors(["Something wrong when get input values"]);
      return;
    }
    
    const formData: IRegisterForm = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    }

    const { error } = registerSchema.validate(formData, { abortEarly: false });

    setValidationErrors([]);
    if(error?.details) {
      setValidationErrors(error.details.map(err => ({msg: err.message, path: err.path[0]})));
      return;
    }
    
    setIsLoading(true);
    const result = await register(formData);
    
    setIsLoading(false);
    if(result != null) {
      setGeneralErrors([...result])
      return;
    }

    setGeneralErrors([]);
    navigate("/");
  }

  const foundErrorMsg = (path: string) => validationErrors.find(err => err.path === path)?.msg;

  return ( <>
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
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
      {
        generalErrors.length > 0 && <Alert severity="error" sx={{width: "100%", border: "1px solid #FF8488"}}>
          <ul>{ generalErrors.map((err, i) => <li key={i}>{err}</li> ) }</ul>
        </Alert>
      }
      
      <Typography variant="h5" gutterBottom className="head-title">Register</Typography>

      <TextField inputRef={nameRef} label="Name" name="name" fullWidth sx={{mt: 2}} />
      {
        foundErrorMsg("name") && <Typography variant="body2" color="error" sx={{width: "100%", pt: ".25rem"}}>
          {foundErrorMsg("name")}
        </Typography>
      }

      <TextField inputRef={emailRef} label="Email" type="email" name="email" fullWidth sx={{mt: 2}} />
      {
        foundErrorMsg("email") && <Typography variant="body2" color="error" sx={{width: "100%", pt: ".25rem"}}>
          {foundErrorMsg("email")}
        </Typography>
      }

      <TextField inputRef={passwordRef} label="Password" type="password" name="password" fullWidth sx={{mt: 2}} />
      {
        foundErrorMsg("password") && <Typography variant="body2" color="error" sx={{width: "100%", pt: ".25rem"}}>
          {foundErrorMsg("password")}
        </Typography>
      }

      <Button variant="outlined" type="submit" sx={{ mt: 2, width: "50%" }}>Submit</Button>
    </Box>
  </> );
}

export default RegisterPage;