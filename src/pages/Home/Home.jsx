import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Campers of your dreams</h1>
            <p>You can find anything you want in our catalog</p>
            <NavLink to="/catalog">
                <button>View Now</button>
            </NavLink>
        </div>
    );
};

export default Home;