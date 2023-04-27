import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { FcBusiness, FcSettings, FcList } from "react-icons/fc";
import { AiFillMessage } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { BsBuildingsFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { AuthContext } from "../../Context/AuthContext";
import Logo from "../../Assets/logo.gif";
import { logoutCall } from "../../ContextCalls";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "#252525",

        padding: "1.5rem",
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
        to="/studentdashboard"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
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
      <Link
        to="/explorejobs"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
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
        <BsFillBriefcaseFill
          size={25}
          style={{ color: "#FD3953", marginRight: "5" }}
        />
        Explore jobs
      </Link>
      <Link
        to="/explorecompanies"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
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
        <BsBuildingsFill
          size={25}
          style={{ color: "#FD3953", marginRight: "5" }}
        />
        Explore Companies
      </Link>
      <Link
        to="/appliedjobs"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
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
        Applied jobs
      </Link>
      <Link
        to="/studentinbox"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
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
      <Link
        to="/studentprofile"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
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
        <AiFillSetting
          size={30}
          style={{ color: "#FD3953", marginRight: "5" }}
        />
        Profile settings
      </Link>
      <div
        onClick={() => {
          logoutCall(dispatch);
          navigate("/login");
        }}
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          cursor: "pointer",
          opacity: "1.0",
          paddingLeft: "5px",
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