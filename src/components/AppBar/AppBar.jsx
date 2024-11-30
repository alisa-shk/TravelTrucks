import { NavLink } from "react-router-dom";

const AppBar = () => {
    return (
        <header>
            <p>TravelTrucks</p>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/catalog">Catalog</NavLink>
            </div>
        </header>
    )
};



export default AppBar;