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
import { GrServices } from "react-icons/gr";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
            <Link to="/services">
              <MdMiscellaneousServices />
              Services
            </Link>
          </li>
          <li>
            <Link to="/add-Service">
              <RiFunctionAddLine />
              Add Services
            </Link>
          </li>

          <li>
            <Link to="/my-review">
              <MdOutlineReviews />
              My Reviews
            </Link>
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
            <Link to="/services">
              <MdMiscellaneousServices />
              Services
            </Link>
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
      <div className="max-w-screen-xl mx-auto relative flex items-center px-4 lg:px-0">
        <div className="navbar py-4 bg-[#00796B] rounded-lg text-white mt-6">
          <div className="navbar-start w-auto lg:w-1/2">
            <div className="dropdown">
              <DrawerRoot>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost lg:hidden pl-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      {" "}
                      <Link
                        to="/"
                        className="navbar-center space-x-2 flex items-center"
                      >
                        <img src={logo} alt="" className="w-16" />
                        <h2 className="text-xl md::text-2xl">
                          Service <br />
                          ScoreBoard
                        </h2>
                      </Link>
                    </DrawerTitle>
                  </DrawerHeader>
                  <DrawerBody>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content  text-primaryColor"
                    >
                      {links}
                      {user && user?.email ? (
                        <ul className="menu p-0">
                          <li>
                            <Link to="/my-service">
                              <GrServices />
                              My Services
                            </Link>
                          </li>

                          <li>
                            <button
                              onClick={logOut}
                              className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white mt-2 mx-4 w-fit"
                            >
                              <RiLogoutCircleLine className="text-2xl" />
                              LogOut
                            </button>
                          </li>
                        </ul>
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
                  </DrawerBody>

                  <DrawerCloseTrigger />
                </DrawerContent>
              </DrawerRoot>
            </div>
            <ul className="menu menu-horizontal px-1 hidden lg:flex">
              {links}
            </ul>
          </div>
          <Link to="/" className="navbar-center space-x-2">
            <img src={logo} alt="" className="w-12 md:w-16" />
            <h2 className="text-lg md:text-2xl">
              Service <br />
              ScoreBoard
            </h2>
          </Link>

          <HStack gap="3" className="navbar-end block flex-grow lg:!hidden">
            <Avatar
              size="md"
              name="Sage"
              src={user && user?.photoURL ? user.photoURL : ""}
            />
          </HStack>

          {user && user?.email ? (
            <div className="navbar-end space-x-4 hidden lg:flex">
              <ul className="menu menu-horizontal px-1 hidden lg:flex">
                <li>
                  <Link to="/my-service">
                    <GrServices />
                    My Services
                  </Link>
                </li>
              </ul>
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
