import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { FcBusiness, FcSettings, FcList } from "react-icons/fc";
import { AiFillMessage } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { AuthContext } from "../../../Context/AuthContext";
import Logo from "../../../Assets/logo.gif";
import { logoutCall } from "../../../ContextCalls";

const Nav = () => {
  const { user, dispatch } = useContext(AuthContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#252525",

        padding: "1rem",
        width: "15%",
      }}
    >
      <img src={Logo} style={{ width: "100%" }} />
      <Link
        to="/Dashboard"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FcList size={20} style={{ color: "white", marginRight: "5" }} />
        Dashboard
      </Link>
      <Link
        to="/recJobFeed"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          marginBottom: "1rem",
        }}
      >
        <FcBusiness size={20} style={{ color: "white", marginRight: "5" }} />
        Recruiter Job Feed
      </Link>
      <Link
        to="/JobAdded"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          marginBottom: "1rem",
        }}
      >
        <IoIosAddCircleOutline
          size={30}
          style={{ color: "silver", marginRight: "5" }}
        />
        Job Added
      </Link>
      <Link
        to="/inbox"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          marginBottom: "1rem",
        }}
      >
        <AiFillMessage
          size={30}
          style={{ color: "silver", marginRight: "5" }}
        />
        Inbox
      </Link>
      <div
        onClick={() => logoutCall(dispatch)}
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        <ImExit size={30} style={{ marginRight: "10px" }} />
        Logout
      </div>
    </div>
  );
};

export default Nav;
