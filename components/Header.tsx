"use client";

import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "@/lib/context/UserContext";
import { logout } from "@/lib/firebase/auth";
// Use next/navigation instead of next/router in the app directory.
import { useRouter } from "next/navigation";

export default function Header() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close the dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white dark:bg-black shadow-sm dark:border-b dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl dark:text-gray-100">
            jConnect by Innovative Timing Systems
          </span>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-2 mr-2">
            <li>
              <Link
                href="/"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
          <ThemeSwitch />
          <div className="relative ml-4" ref={dropdownRef}>
            <div
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer"
            >
              {user ? (
                <span className="text-sm text-white font-medium">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="text-sm text-white font-medium">U</span>
              )}
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
                {!user ? (
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/sign-in"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
