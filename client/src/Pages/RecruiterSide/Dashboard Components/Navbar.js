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
import { MdSpaceDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, dispatch } = useContext(AuthContext);
  console.log("user in navbar is: ", user);
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "#252525",
        paddingLeft: "3rem",
        padding: "1rem",
        width: "15%",
      }}
    >
      <img
        src={Logo}
        style={{ width: "100%" }}
        onClick={() => {
          if (user.isrecruiter) navigate("/Dashboard");
          else navigate("/studentdashboard");
        }}
      />
      <Link
        to="/Dashboard"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
          cursor: "pointer",
          opacity: "1.0",
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(event) => {
          event.target.style.opacity = "0.6";
        }}
        onMouseLeave={(event) => {
          event.target.style.opacity = "1.0";
        }}
      >
        <MdSpaceDashboard
          size={30}
          style={{ color: "#FD3953", marginRight: "5" }}
        />
        Dashboard
      </Link>
      {/* <Link
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
      </Link> */}
      <Link
        to="/JobAdded"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
          cursor: "pointer",
          opacity: "1.0",
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(event) => {
          event.target.style.opacity = "0.6";
        }}
        onMouseLeave={(event) => {
          event.target.style.opacity = "1.0";
        }}
      >
        <IoIosAddCircleOutline
          size={30}
          style={{ color: "#FD3953", marginRight: "5" }}
        />
        Jobs Added
      </Link>
      <Link
        to="/inbox"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
          cursor: "pointer",
          opacity: "1.0",
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(event) => {
          event.target.style.opacity = "0.6";
        }}
        onMouseLeave={(event) => {
          event.target.style.opacity = "1.0";
        }}
      >
        <AiFillMessage
          size={30}
          style={{ color: "#FD3953", marginRight: "5" }}
        />
        Inbox
      </Link>
      <div
        onClick={() => {
          logoutCall(dispatch);
          navigate("/login");
        }}
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
          cursor: "pointer",
          opacity: "1.0",
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(event) => {
          event.target.style.opacity = "0.6";
        }}
        onMouseLeave={(event) => {
          event.target.style.opacity = "1.0";
        }}
      >
        <ImExit size={30} style={{ color: "#FD3953", marginRight: "5" }} />
        Logout
      </div>
    </div>
  );
};

export default Nav;
