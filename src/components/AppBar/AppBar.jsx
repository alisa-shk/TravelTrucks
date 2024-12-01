import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./AppBar.module.css";

const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
};

const AppBar = () => {
    return (
        <header className={s.header}>
            <p className={s.logo}>Travel<span className={s.logoSpan}>Trucks</span></p>
            <div className={s.navLinks}>
                <NavLink to="/" className={buildLinkClass}>Home</NavLink>
                <NavLink to="/catalog" className={buildLinkClass}>Catalog</NavLink>
            </div>
        </header>
    )
};


export default AppBar;