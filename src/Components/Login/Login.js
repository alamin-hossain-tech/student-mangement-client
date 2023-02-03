import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Login = () => {
  const { signIn, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    signIn(data.email, data.password)
      .then((data) => {
        toast.success("Logged in successfully");
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };
  return (
    <div className="w-1/3 mx-auto py-24">
      <div>
        <h2 className="font-semibold text-4xl text-center pb-4">Login</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Email" {...register("email")} />
        <div className="py-3">
          <TextField
            type="password"
            fullWidth
            label="Password"
            {...register("password")}
          />
        </div>
        <div className="text-center">
          <button
            className="bg-[#F33823] px-8 py-2 rounded mt-3 text-white"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
