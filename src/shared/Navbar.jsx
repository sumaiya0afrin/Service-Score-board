import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  RiFunctionAddLine,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { GoHome } from "react-icons/go";
import { MdMiscellaneousServices, MdOutlineReviews } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "@/authProvider/AuthProvider";
import { Avatar } from "@/components/ui/avatar";
import { HStack } from "@chakra-ui/react";

const Navbar = () => {
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      {user && user?.email ? (
        <>
          <li>
            <Link to="/">
              <GoHome />
              Home
            </Link>
          </li>
          <li>
            <a>
              <MdMiscellaneousServices />
              Services
            </a>
          </li>
          <li>
            <Link to="/add-Service">
              <RiFunctionAddLine />
              Add Services
            </Link>
          </li>
          <li>
            <a>
              <MdOutlineReviews />
              My Reviews
            </a>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/">
              <GoHome />
              Home
            </Link>
          </li>
          <li>
            <a>
              <MdMiscellaneousServices />
              Services
            </a>
          </li>
        </>
      )}
    </>
  );

  return (
    <div
      className={`${
        location.pathname === "/" ? "absolute" : "none"
      }  top-0 left-0 w-full z-50`}
    >
      <div className="max-w-screen-xl mx-auto relative flex items-center">
        <div className="navbar py-4 bg-[#00796B] rounded-lg text-white mt-6">
          <div className="navbar-start w-auto lg:w-1/2">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-primaryColor"
              >
                {links}
                {user && user?.email ? (
                  <div className="navbar-end">
                    <HStack gap="3">
                      <Avatar
                        size="md"
                        name="Sage"
                        src={user && user?.photoURL ? user.photoURL : ""}
                      />
                    </HStack>
                    <button
                      onClick={logOut}
                      className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white"
                    >
                      <RiLogoutCircleLine className="text-2xl" />
                      LogOut
                    </button>
                  </div>
                ) : (
                  <div className="navbar-end">
                    <Link
                      to="/signIn"
                      className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white"
                    >
                      <RiLoginCircleLine className="text-2xl" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </ul>
            </div>
            <ul className="menu menu-horizontal px-1 hidden lg:flex">
              {links}
            </ul>
          </div>
          <div className="navbar-center space-x-2">
            <img src={logo} alt="" className="w-16" />
            <h2 className="text-xl md::text-2xl">
              Service <br />
              ScoreBoard
            </h2>
          </div>
          {user && user?.email ? (
            <div className="navbar-end space-x-4 hidden lg:flex">
              <HStack gap="3">
                <Avatar
                  size="md"
                  name="Sage"
                  src={user && user?.photoURL ? user.photoURL : ""}
                />
              </HStack>
              <button
                onClick={logOut}
                className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white"
              >
                <RiLogoutCircleLine className="text-2xl" />
                LogOut
              </button>
            </div>
          ) : (
            <div className="navbar-end hidden lg:flex join">
              <Link
                to="/signIn"
                className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white"
              >
                <RiLoginCircleLine className="text-2xl" />
                Login
              </Link>
              <Link
                to="/register"
                className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
