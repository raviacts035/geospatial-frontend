import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, onLogout }) {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">GeoJSON Editor</h1>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li>
                <Link to="/" className="text-white hover:text-blue-200">
                  Map
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="text-white hover:text-blue-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-blue-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-blue-200">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;