import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <div>Home
            <NavLink to="/catalog">
                <button>View Now</button>
            </NavLink>
        </div>
    );
};

export default Home;