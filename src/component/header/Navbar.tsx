"use client";
import React, { useState, useEffect } from "react";
import module from "../header/header.module.css";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdNotificationsActive } from "react-icons/md";

interface Notification {
  id: number;
  title: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/login/check-login",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log("Login status response:", data);
        setLoggedIn(data.loggedIn);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (loggedIn) {
        try {
          const response = await fetch("http://localhost:5000/notifications/getAllNotifications",
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await response.json();
          setNotifications(data);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [loggedIn]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/login/logout", {
        method: "POST",
        credentials: "include",
      });
      setLoggedIn(false);
      setIsAdmin(false);
      console.log("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(false);
    router.push("/news"); 
  };

  return (
    <nav className={module.nav}>
      <div className={module.hamburger} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={module.logo}>FCI</div>
      <ul className={`${module.navLinks} ${isOpen ? module.showMenu : ""}`}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="#about">About</Link>
        </li>
        <li>
          <Link href="#">Contact</Link>
        </li>
      </ul>
      <div className={module.authLinks}>
        {loggedIn && !isAdmin ? (
          <>
            <div className={module.notificationContainer}>
              <MdNotificationsActive
                className={module.notification}
                onClick={toggleNotifications}
              />
              {showNotifications && (
                <div className={module.notificationDropdown}>
                  <ul>
                    {notifications.map((notification, index) => (
                      <li
                        key={index}
                        className={module.notificationItem}
                        onClick={handleNotificationClick} 
                      >
                        {notification.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button onClick={handleLogout} className={module.logout}>
              Logout
            </button>
          </>
        ) : loggedIn && isAdmin ? (
          <>
            <button onClick={handleLogout} className={module.logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={module.login}>
              Log In
            </Link>
            <Link href="/register" className={module.signup}>
              Free Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
