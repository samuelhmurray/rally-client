import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";

export const Nav = () => {
  // Get the current pathname using useLocation hook
  const location = useLocation();

  return (
    <nav className="sticky top-0 left-0 right-0 bg-black p-5">
      <div className="flex justify-between">
        <div className="flex justify-between">
          <Link to="/">
            <button className={`mr-16 ml-5 font-bold text-6xl flex justify-center items-center text-teal-300 hover:text-teal-700 w-8 h-10 p-8 ${location.pathname === '/' ? 'underline' : ''}`}>
              <FontAwesomeIcon icon={faHome} className="w-14 h-14" />
            </button>
          </Link>
          <Link to="/mine">
            <button className={`mr-28 font-bold text-6xl flex justify-center items-center text-teal-300 hover:text-teal-700 w-6 h-6 p-8 ${location.pathname === '/mine' ? 'underline' : ''}`}>
              MINE
            </button>
          </Link>
          <Link to="/all">
            <button className={`mr-28 font-bold text-6xl flex justify-center items-center text-teal-300 hover:text-teal-700 w-6 h-6 p-8 ${location.pathname === '/all' ? 'underline' : ''}`}>
              ALL
            </button>
          </Link>
          <Link to="/add">
            <button className={`mr-28 font-bold text-6xl flex justify-center items-center text-teal-300 hover:text-teal-700 w-6 h-6 p-8 ${location.pathname === '/add' ? 'underline' : ''}`}>
              NEW
            </button>
          </Link>
        </div>
        <div>
          <Link to="/login">
            <button className="flex justify-center mr-10 items-center text-teal-300 hover:text-teal-700 w-6 h-6 p-8">
              <FontAwesomeIcon size="3x" icon={faSignOutAlt} />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
