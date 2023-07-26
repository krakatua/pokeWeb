import { navLinks, styles } from "../constants";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { useState } from "react";

const Navbar = () => {

    const [active, setActive] = useState('')
    const [toggle, setToggle] = useState(false);


  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-black`}
    >
      <div
        className="w-full flex justify-between items-center
        max-w-7xl mx-auto"
      >
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-110 transition-all animate-fade-right"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-20 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor pointer flex">
            Pokemon |&nbsp; <span className="sm:block hidden">Wiki</span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10 animate-fade-left">
            {
                navLinks.map((link) => (
                    <li key={link.id} className={`${
                        active === link.title
                        ? 'text-white'
                        : 'text-gray-200'
                    } hover:text-white transition-all hover:scale-110 text-[18px] font-medium cursor-pointer`}>
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                ))
            }

        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toggle ? close : menu} alt="menu"
          className='w-[28px] h-[28px] object-contain cursor-pointer' 
          onClick={() => setToggle(!toggle)}/>
          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute
          top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
            <ul className='list-none flex justify-end flex-col gap-4'>
          {navLinks.map((link) => (
            <li key={link.id} className={`${
              active === link.title 
              ? 'text-white'
              : "text-secondary"
            } font-poppins font-medium cursor-pointer text-[16px]`}
            onClick={() => {
              setToggle(!toggle);
              setActive(link.title)}}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
