import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import Header from "../Header/Header";
import Login from "../Login/Login";

const Main = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    logOut()
      .then((d) => {
        setOpen(false);
      })
      .catch();
  };

  return (
    <div>
      <Header></Header>
      {!user && !loading && <Login></Login>}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {user && !loading && (
        <div className="container mx-auto">
          <div className="flex">
            <div className="w-1/4 h-[500px] flex flex-col gap-5 dashboard pt-12 pr-5">
              <NavLink className="px-3 rounded py-2" to="/">
                Add Student
              </NavLink>
              <NavLink className="px-3 rounded py-2" to="/manage-student">
                Manage Students
              </NavLink>
              <p
                onClick={() => setOpen(true)}
                className="px-3 py-2 hover:cursor-pointer"
              >
                Logout
              </p>
            </div>
            <div className="w-3/4">
              <Outlet></Outlet>
            </div>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure want to logout"}
            </DialogTitle>
            {/* <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent> */}
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleLogOut} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Main;
