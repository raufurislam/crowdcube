import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProviders";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [theme, setTheme] = useState("light");

  // Set theme on component mount based on localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme and save preference to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const link = (
    <div className="flex flex-col text-left lg:flex-row lg:gap-10 gap-3 px-2 py-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-medium" : "text-gray-500 font-medium"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/addCampaign"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-medium" : "text-gray-500 font-medium"
        }
      >
        Add Campaign
      </NavLink>
      <NavLink
        to="/campaigns"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-medium" : "text-gray-500 font-medium"
        }
      >
        All Campaign
      </NavLink>
      <NavLink
        to="/myCampaign"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-medium" : "text-gray-500 font-medium"
        }
      >
        My Campaign
      </NavLink>
      <NavLink
        to="/myDonations"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-medium" : "text-gray-500 font-medium"
        }
      >
        My Donations
      </NavLink>
      {user && user.email ? (
        <button onClick={logOut} className="md:hidden text-left">
          Logout
        </button>
      ) : (
        <Link to="/auth/login" className="md:hidden">
          Login
        </Link>
      )}
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto navbar bg-base-100">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-44 p-2 shadow text-center"
          >
            {link}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl px-0">
          <img
            src="https://i.ibb.co.com/VwB2ZjN/Crowd-Cube-06.png"
            alt="Project Warmth"
            className="w-8 object-cover"
          />
          Crowdcube
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <div className="bg-base-200 rounded-full w-8 h-8 md:w-11 md:h-11 flex items-center justify-center mr-2 md:mr-3 lg:mr-3">
          {user && user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 md:w-11 md:h-11 object-cover rounded-full"
            />
          ) : (
            <img
              src="https://img.icons8.com/?size=80&id=ARWy_JjgohtA&format=png"
              alt=""
              className="w-5"
            />
          )}
        </div>

        {/* dark and light theme */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost text-xl flex items-center justify-center"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* login and logout button  */}
        {user && user.email ? (
          <button
            onClick={logOut}
            className="hidden md:flex btn btn-sm md:btn-md"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth/login"
            className="hidden md:flex btn btn-sm md:btn-md"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
