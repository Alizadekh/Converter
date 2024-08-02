import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../../features/themeSlice";
import style from "../../css/Navbar.module.css";

function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`${style.header} ${
        theme === "dark" ? style.dark : style.light
      }`}
    >
      <div className={style.navbar}>
        <div className={style.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="none"
            viewBox="0 0 50 50"
          >
            <path
              stroke="#344054"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M29.167 20.833s7.354.855 11.333-3.708c4-4.625 3.25-12.958 3.25-12.958a17 17 0 0 0-5.27.375l-.98 3.791-3.98-1.479c-.43.325-.818.693-1.166 1.104-4 4.542-3.187 12.875-3.187 12.875Zm0 0L25 25"
            />
            <path
              stroke="#FF9500"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M25 6.25H8.333A2.083 2.083 0 0 0 6.25 8.333v33.334a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083V25"
            />
            <path
              fill="#000"
              d="M13.462 31.094c0-.784.154-1.48.462-2.086.317-.607.742-1.073 1.274-1.4a3.428 3.428 0 0 1 1.806-.49c.579 0 1.083.117 1.512.35a3.05 3.05 0 0 1 1.05.882v-1.106h1.974V35h-1.974v-1.134c-.252.364-.602.667-1.05.91-.439.233-.947.35-1.526.35-.653 0-1.25-.168-1.792-.504-.532-.336-.957-.807-1.274-1.414-.308-.616-.462-1.32-.462-2.114Zm6.104.028c0-.476-.093-.882-.28-1.218a1.916 1.916 0 0 0-.756-.784 1.981 1.981 0 0 0-1.022-.28c-.364 0-.7.089-1.008.266a2.04 2.04 0 0 0-.756.784c-.187.336-.28.737-.28 1.204 0 .467.093.877.28 1.232.196.345.448.611.756.798.317.187.653.28 1.008.28.364 0 .705-.089 1.022-.266.317-.187.57-.448.756-.784.187-.345.28-.756.28-1.232Zm4.882-4.802c-.345 0-.634-.107-.868-.322a1.123 1.123 0 0 1-.336-.826c0-.327.112-.597.336-.812.234-.224.523-.336.868-.336.346 0 .63.112.854.336.234.215.35.485.35.812a1.1 1.1 0 0 1-.35.826c-.224.215-.508.322-.854.322Zm.966.924V35h-1.96v-7.756h1.96Z"
            />
            <circle cx="24.5" cy="25.5" r="1.5" fill="#344054" />
          </svg>
          <p>converter</p>
        </div>
        <div className={style.modeIcon} onClick={handleToggleTheme}>
          {theme === "dark" ? (
            <FaSun className={style.icon} />
          ) : (
            <FaMoon className={style.icon} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
