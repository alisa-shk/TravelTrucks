import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { selectIsError, selectIsLoading, selectSelectedCamper } from "../../redux/selectors.js";
import { useEffect } from "react";
import { fetchCamperByIdThunk } from "../../redux/slice.js";


const Camper = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const camper = useSelector(selectSelectedCamper);
    const loading = useSelector(selectIsLoading);
    const error = useSelector(selectIsError);

    useEffect(() => {
        dispatch(fetchCamperByIdThunk(id));
    }, [dispatch, id])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!camper) return null;

    return (
        <div>
            <h1>{camper.name}</h1>
            <p>{camper.location}</p>
            <p>Price: €{camper.price}</p>

            <div>
                {camper.gallery.map((image, index) => (
                    <img
                        key={index}
                        src={image.thumb}
                        alt={camper.description}
                        width={100}
                        height={100}
                    />
                ))}
            </div>
            <div>
                <NavLink to="features" state={{ features: camper }}>Features</NavLink>
                <NavLink to="reviews" state={{ reviews: camper.reviews }}>Reviews</NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export default Camper;