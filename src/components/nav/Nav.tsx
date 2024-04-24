import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-black p-5">
      <div className="flex">
        <div className="flex">
          <Link to="/">
            <button className="flex justify-center ml-10 items-center text-teal-300 border border-teal-300 border-solid hover:rounded-2xl w-6 h-6 p-10 rounded-full bg-black">
              home
            </button>
          </Link>{" "}
          <Link to="/mine">
            <button className="flex justify-center ml-10 items-center text-teal-300 border border-teal-300 border-solid hover:rounded-2xl w-6 h-6 p-10 rounded-full bg-black">
              mine
            </button>
          </Link>{" "}
          <Link to="/all">
            <button className="flex justify-center ml-10 items-center text-teal-300 border border-teal-300 border-solid hover:rounded-2xl w-6 h-6 p-10 rounded-full bg-black">
              all
            </button>
          </Link>{" "}
          <Link to="/add">
            <button className="flex justify-center ml-10 items-center text-teal-300 border border-teal-300 border-solid hover:rounded-2xl w-6 h-6 p-10 rounded-full bg-black">
              add
            </button>
          </Link>{" "}
          <Link to="/login">
            <button className="flex justify-center ml-10 items-center text-teal-300 border border-teal-300 border-solid hover:rounded-2xl w-6 h-6 p-10 rounded-full bg-black">
              logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
