import Link from "next/link";
import React from "react";
import module from "../header/header.module.css"; 
import Navbar from "./Navbar";
const Header = () => {
  return (
    <header className={module.header}>
     <Navbar />
    </header>
  );
};

export default Header;
