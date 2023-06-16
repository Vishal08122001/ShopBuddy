import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { ArrowSmallUpIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-gray-300 hover:text-gray-400 text-lg"
              />
            </a>
          </div>
          <div className="mr-4">
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-gray-300 hover:text-gray-400 text-lg"
              />
            </a>
          </div>
          <div className="mr-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-gray-300 hover:text-gray-400 text-lg"
              />
            </a>
          </div>
        </div>
        <div className="mt-4">
          <ul className="flex justify-center">
            <li className="mx-3">
              <Link to="/" className="text-gray-300 hover:text-gray-400">
                Home
              </Link>
            </li>
            <li className="mx-3">
              <Link to="/" className="text-gray-300 hover:text-gray-400">
                About
              </Link>
            </li>
            <li className="mx-3">
              <Link to="/" className="text-gray-300 hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center mt-4">
          <p className="text-center text-gray-300 text-sm mr-2">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <a href="#top" className="text-gray-300 hover:text-gray-400">
            <ArrowSmallUpIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
