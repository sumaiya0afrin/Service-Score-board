import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { RiLoginCircleLine } from "react-icons/ri";
import { GoHome } from "react-icons/go";
import { MdMiscellaneousServices } from "react-icons/md";

const Navbar = () => {
  const links = (
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
  );
  return (
    <div className=" absolute top-0 left-0 w-full z-50">
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
                <div className="navbar-end space-x-6 ">
                  <Link to="/register" className="underline">
                    Register
                  </Link>
                  <a className="btn bg-primaryColor border-none">
                    <RiLoginCircleLine className="text-2xl" />
                    Login
                  </a>
                </div>
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
          <div className="navbar-end hidden lg:flex join">
            <button className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white">
              <RiLoginCircleLine className="text-2xl" />
              Login
            </button>
            <button className="btn bg-primaryColor border-none join-item hover:bg-gray-900 hover:text-white">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
