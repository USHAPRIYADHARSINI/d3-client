import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function FormDialog({setToken}) {
  const [open, setOpen] = useState(false);
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [emailErr,setEmailErr] = useState(false)
  const [passwordErr,setPasswordErr] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const LOCAL_URL= process.env.REACT_APP_LOCAL_URL;

  const handleLogin = async(e) => {
    e.preventDefault()

    setEmailErr(false)
    setPasswordErr(false)

    if(email == ""){
      setEmailErr(true)
    }
    if(password == ""){
      setPasswordErr(true)
    }
    const newUser = {
      email:email,
      password:password,
    }

    if(newUser){
      console.log(newUser.name, newUser.email, newUser.password, newUser.pp)
      console.log(LOCAL_URL)
      await fetch(`https://dashboard-app-u41p.onrender.com/users/login`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => data.json())
      .then((data) => {
        if (data.msg === "Login Successfully") {
          localStorage.setItem("Authorization",data.token)
          setToken(data.token)
          alert(data.msg);
          handleClose();
          navigate("/");
        }
      })
    }
    
  };

  return (
    <div>
      <Button variant="filled" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{padding: 1}} className='bg'>
      <Typography
            variant='h6'
            color="textSecondary"
            component="h2"
            gutterBottom
          />
        <DialogTitle>Login</DialogTitle>
        <div className='dialog'>
        <h5>Demo credentials</h5>
        <p className='cred'>Email: admin@gmail.com</p>
        <p className='cred'>Password: Admin@123</p>
        <form noValidate autoComplete='off' onSubmit={handleLogin} >
          <TextField
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            required
            color="secondary"
            error={emailErr}
          />
          <TextField
            onChange={(e)=>setPassword(e.target.value)}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            required
            color="secondary"
            error={passwordErr}
          />
          <Button variant="filled" onClick={handleClose}>Cancel</Button>
          <Button variant="filled" type='submit'>Login</Button>
        </form>
        </div>
      </Dialog>
    </div>
  );
}