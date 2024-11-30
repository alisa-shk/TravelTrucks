import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampersThunk, resetCampers } from "../../redux/slice.js";
import { selectAllCampers, selectFilters, selectIsError, selectIsLoading } from "../../redux/selectors.js";

const Catalog = () => {
    const dispatch = useDispatch();

    const campers = useSelector(selectAllCampers);
    const loading = useSelector(selectIsLoading);
    const error = useSelector(selectIsError);
    const filters = useSelector(selectFilters);

    useEffect(() => {
        dispatch(resetCampers());
        dispatch(fetchCampersThunk(filters));
    }, [filters, dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Catalog</h1>
            <ul>
                {campers.map(camper => (
                    <li key={camper.id}>
                        <h3>{camper.name}</h3>
                        <p>{camper.description}</p>
                        <img
                            src={camper.gallery[0].thumb}
                            alt={camper.name}
                            width={100}
                            height={100}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Catalog;