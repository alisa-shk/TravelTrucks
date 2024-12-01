import { NavLink } from "react-router-dom";
import s from "./Home.module.css";

const Home = () => {
    return (
        <div className={s.container}>
            <h1 className={s.heading}>Campers of your dreams</h1>
            <p className={s.text}>You can find anything you want in our catalog</p>
            <NavLink to="/catalog">
                <button className={s.btn}>View Now</button>
            </NavLink>
        </div>
    );
};

export default Home;