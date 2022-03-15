import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-hero-pattern py-2  w-screen flex items-center justify-center mt-auto ">
      <div className=" w-full lg:w-cw flex flex-col lg:flex-row items-center lg:justify-between py-4">
        <div className="flex flex-col items-center w-5/6 lg:w-1/4">
          <Link to="/">
            <img className="w-20 h-20" src="/assets/logo.svg" alt="logo" />
          </Link>
          <p>
            let us help you to grow in your field through a collection of the most popular books with less price than
            any one.
          </p>
        </div>
        <div className="w-1/4  hidden lg:flex flex-col items-center justify-center gap-2 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/books/all">Books</Link>
          <Link to="/categories">Categories</Link>
          <Link to="#">Contact Us</Link>
          <Link to="#">About Us</Link>
        </div>
        <div className="w-5/6 lg:w-1/4 flex flex-col items-center justify-center mt-6 lg:mt-0">
          <span>Follow us on</span>
          <div className="flex items-center gap-2 mt-2">
            <a target="_blank" href="https://www.facebook.com/TopInterns" rel="noreferrer">
              <img className="w-8 h-8" src="/assets/facebook.svg" alt="facebook" />
            </a>
            <a target="_blank" href="https://www.instagram.com/topinterns/" rel="noreferrer">
              <img className="w-8 h-8" src="/assets/insta.svg" alt="instagram" />
            </a>
            <a target="_blank" href="https://twitter.com/TopInterns" rel="noreferrer">
              <img className="w-8 h-8" src="/assets/twitter.svg" alt="twitter" />
            </a>
          </div>
          <span className="mt-6"> &copy; 2022 talpods</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
