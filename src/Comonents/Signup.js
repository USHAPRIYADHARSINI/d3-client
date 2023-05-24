import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    // console.log(name,value)
    setNewUser((prev)=>{
      return{...prev,[name]: value}
    });
  };

  const handleAllClear = () => {
    setNewUser({
      name: "",
      email: "",
      password: ""
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNameErr(false);
    setEmailErr(false);
    setPasswordErr(false);
    handleAllClear();
  };

  const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(newUser)

    if (newUser.name == "") {
      setNameErr(true);
    }
    if (newUser.email == "") {
      setEmailErr(true);
    }
    if (newUser.password == "") {
      setPasswordErr(true);
    }

    if (newUser.name && newUser.email && newUser.password) {
      console.log(newUser.name, newUser.email, newUser.password);
      console.log(LOCAL_URL);
      await fetch(`http://localhost:5000/users/signup`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data) {
            alert(data.msg);
            handleClose();
            handleAllClear();
            navigate("/");
          }
        });
    }
  };

  return (
    <div>
      <Button variant="filled" onClick={handleClickOpen}>
        Signup
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ padding: 1 }}>
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        />
        <DialogTitle>Enter details for new user signup</DialogTitle>
        <div className="dialog">
          <form noValidate autoComplete="off" onSubmit={handleLogin}>
            <TextField
              onChange={handleChange}
              margin="dense"
              id="name"
              label="Name"
              type="text"
              name="name"
              fullWidth
              variant="standard"
              required
              color="secondary"
              error={nameErr}
            />
            <TextField
              onChange={handleChange}
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              name="email"
              fullWidth
              variant="standard"
              required
              color="secondary"
              error={emailErr}
            />
            <TextField
              onChange={handleChange}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              name="password"
              fullWidth
              variant="standard"
              required
              color="secondary"
              error={passwordErr}
            />            
            <Button variant="filled" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="filled" type="submit">
              Signup
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
