import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { useTime } from "../Utilities/useTime/useTime";

const ViewDetail = () => {
  const data = useLoaderData();

  return (
    <div className="px-5">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">
          Details of {`${data.firstName} ${data.middleName} ${data.lastName}`}
        </h2>
        <p>{useTime()}</p>
      </div>
      <div className="pt-5">
        <form>
          <div className="flex gap-5 pb-5">
            <TextField
              size="small"
              label="First Name"
              fullWidth
              required
              defaultValue={data.firstName}
              InputProps={{
                readOnly: true,
              }}
            ></TextField>
            <TextField
              size="small"
              label="Middle Name"
              defaultValue={data.middleName}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            ></TextField>
            <TextField
              required
              size="small"
              label="Last Name"
              fullWidth
              defaultValue={data.lastName}
              InputProps={{
                readOnly: true,
              }}
            ></TextField>
          </div>
          <div className="flex gap-5 pb-10">
            <FormControl size="small" fullWidth>
              <InputLabel id="class">Select Class</InputLabel>
              <Select
                required
                defaultValue={data.class}
                InputProps={{
                  readOnly: true,
                }}
                disabled
                labelId="class"
                label="Select Class"
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
                labelId="division"
                defaultValue={data.division}
                label="Select Division"
                disabled
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
              defaultValue={data.roll}
              InputProps={{
                readOnly: true,
              }}
            ></TextField>
          </div>
          <div className="flex gap-5 pb-5">
            <TextField
              required
              size="small"
              label="Adress Line 1"
              fullWidth
              defaultValue={data.adress1}
              InputProps={{
                readOnly: true,
              }}
            ></TextField>
            <TextField
              required
              size="small"
              label="Adress Line 2"
              fullWidth
              defaultValue={data.adress2}
              InputProps={{
                readOnly: true,
              }}
            ></TextField>
          </div>
          <div className="flex gap-5">
            <TextField
              required
              size="small"
              label="Landmark"
              fullWidth
              defaultValue={data.landmark}
              InputProps={{
                readOnly: true,
              }}
            ></TextField>
            <TextField
              required
              size="small"
              label="City"
              defaultValue={data.city}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            ></TextField>
            <TextField
              required
              size="small"
              label="Pincode"
              fullWidth
              type="number"
              defaultValue={data.pincode}
              InputProps={{
                readOnly: true,
              }}
            ></TextField>
          </div>
        </form>
        <div className=" my-4 border-2 border-black h-48 w-48 flex items-center justify-center">
          <img
            className="h-44 w-44"
            src={
              data.profile_pic === ""
                ? "https://i.ibb.co/7tZrcy6/blank-profile-picture-gcdd16a7e3-640.png"
                : data.profile_pic
            }
            alt=""
          />
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default ViewDetail;
