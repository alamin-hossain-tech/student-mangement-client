import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { useTime } from "../Utilities/useTime/useTime";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useQuery } from "react-query";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F33823",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFF6F5",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ManageStudent = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const {
    isLoading,
    error,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () =>
      fetch("https://student-brown.vercel.app/students").then((res) =>
        res.json()
      ),
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    fetch(`https://student-brown.vercel.app/delete/${id}`, {
      method: "POST",
      headers: {
        "content-type": "aplication/json",
      },
    })
      .then((res) => {
        toast.success("Deleted");
        refetch();
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="px-5">
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">Manage Students</h2>
        <p>{useTime()}</p>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isLoading && (
        <div className="pt-5">
          {data.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Class</StyledTableCell>
                    <StyledTableCell align="right">Roll</StyledTableCell>
                    <StyledTableCell align="right">
                      View / Edit / Delete
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row.firstName} {row.middleName && row.middleName}{" "}
                        {row.lastName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.class}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.roll}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Link to={`/view/${row._id}`}>
                          <Tooltip title="View">
                            <IconButton>
                              <VisibilityOutlinedIcon className="text-[#F33823]" />
                            </IconButton>
                          </Tooltip>
                        </Link>

                        <Link to={`/edit/${row._id}`}>
                          {" "}
                          <Tooltip title="Edit">
                            <IconButton>
                              <BorderColorOutlinedIcon className="text-[#F33823] " />
                            </IconButton>
                          </Tooltip>
                        </Link>

                        <Tooltip title="Delete">
                          <IconButton onClick={() => setOpen(true)}>
                            <DeleteOutlineOutlinedIcon className="text-[#F33823]" />
                          </IconButton>
                        </Tooltip>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure want to delete"}
                          </DialogTitle>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                              onClick={() => handleDelete(row._id)}
                              autoFocus
                            >
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="p-5">
              <h2 className="text-2xl font-semibold">
                No Student added yet. Please add one
              </h2>
              <div className="py-4">
                <Link className="px-5 py-2 bg-[red] text-white " to="/">
                  Add Student
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageStudent;
