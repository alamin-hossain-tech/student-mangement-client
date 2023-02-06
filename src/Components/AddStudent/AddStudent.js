import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useTime } from "../Utilities/useTime/useTime";

const AddStudent = () => {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();
  const [level, setLevel] = useState("");
  const [division, setDivision] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imghostkey = process.env.REACT_APP_imgbb;

  const onSubmit = (data) => {
    setIsLoading(true);

    if (data.profile_pic[0]) {
      const image = data.profile_pic[0];
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          if (imageData.success) {
            const student = {
              firstName: data.firstName,
              middleName: data.middleName,
              lastName: data.lastName,
              class: data.class,
              division: data.division,
              roll: data.roll,
              adress1: data.adress1,
              adress2: data.adress2,
              landmark: data.landmark,
              city: data.city,
              pincode: data.pincode,
              profile_pic: imageData.data.url,
              published_time: new Date(),
            };
            fetch("https://student-brown.vercel.app/add-student", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(student),
            })
              .then((res) => res.json())
              .then((result) => {
                toast.success("Student Added Succesfully");
                reset();
                setDivision("");
                setLevel("");
                setIsLoading(false);
              });
          } else {
            toast.error("Provide a Valid image file");
            setIsLoading(false);
          }
        });
    } else {
      const student = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        class: data.class,
        division: data.division,
        roll: data.roll,
        adress1: data.adress1,
        adress2: data.adress2,
        landmark: data.landmark,
        city: data.city,
        pincode: data.pincode,
        profile_pic: "",
        published_time: new Date(),
      };
      fetch("https://student-brown.vercel.app/add-student", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(student),
      })
        .then((res) => res.json())
        .then((result) => {
          toast.success("Student Added Succesfully");
          reset();
          setDivision("");
          setLevel("");
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="px-5">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">Add Student</h2>
        <p>{useTime()}</p>
      </div>
      <div className="pt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 pb-5">
            <TextField
              size="small"
              label="First Name"
              fullWidth
              required
              {...register("firstName")}
            ></TextField>
            <TextField
              size="small"
              label="Middle Name"
              fullWidth
              {...register("middleName")}
            ></TextField>
            <TextField
              required
              size="small"
              label="Last Name"
              fullWidth
              {...register("lastName")}
            ></TextField>
          </div>
          <div className="flex gap-5 pb-10">
            <FormControl size="small" fullWidth>
              <InputLabel id="class">Select Class</InputLabel>
              <Select
                {...register("class")}
                required
                labelId="class"
                label="Select Class"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel id="division">Select Division</InputLabel>
              <Select
                required
                {...register("division")}
                labelId="division"
                label="Select Division"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="E">E</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size="small"
              label="Enter Roll Number in Digits"
              fullWidth
              required
              type="number"
              onInput={(e) => {
                let maxLength = 2;
                const value = +e.target.value;
                if (value > 2) {
                  e.target.value = e.target.value.slice(0, maxLength);
                }
              }}
              {...register("roll")}
            ></TextField>
          </div>
          <div className="flex gap-5 pb-5">
            <TextField
              required
              size="small"
              label="Adress Line 1"
              fullWidth
              {...register("adress1")}
            ></TextField>
            <TextField
              required
              size="small"
              label="Adress Line 2"
              fullWidth
              {...register("adress2")}
            ></TextField>
          </div>
          <div className="flex gap-5">
            <TextField
              required
              size="small"
              label="Landmark"
              fullWidth
              {...register("landmark")}
            ></TextField>
            <TextField
              required
              size="small"
              label="City"
              fullWidth
              {...register("city")}
            ></TextField>
            <TextField
              required
              size="small"
              label="Pincode"
              fullWidth
              type="number"
              onInput={(e) => {
                let maxLength = 6;
                const value = +e.target.value;
                if (value > 2) {
                  e.target.value = e.target.value.slice(0, maxLength);
                }
              }}
              {...register("pincode")}
            ></TextField>
          </div>
          <div className="mt-3 mb-2 text-stone-600">
            <label htmlFor="profile_picture">Student Profile Picture</label>
          </div>
          <div className="py-2 px-3 border border-stone-300 rounded ">
            <input
              id="profile_picture"
              type="file"
              {...register("profile_pic")}
            />
          </div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <button
            className="mt-5 px-5 py-2 bg-[#F33823] rounded text-white"
            type="submit"
          >
            {" "}
            Add Student
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default AddStudent;
