import React, { useContext } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";

const Header = () => {
  const { user, loading } = useContext(AuthContext);
  return (
    <div>
      <div className="container mx-auto flex justify-between pt-10 pb-16">
        <div className="logo">
          <h2 className="text-4xl font-bold">Student App</h2>
        </div>
        <div>
          {!loading && user && (
            <div className="px-10 py-2 border rounded">
              <PersonOutlineIcon></PersonOutlineIcon> {user?.email}
            </div>
          )}
          <Toaster></Toaster>
        </div>
      </div>
    </div>
  );
};

export default Header;
