import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampersThunk, resetCampers } from "../../redux/slice.js";
import { selectAllCampers, selectFilters, selectIsError, selectIsLoading, selectShownCampers } from "../../redux/selectors.js";
import Filters from "../../components/Filters/Filters.jsx";
import s from "./Catalog.module.css"
import Loader from "../../components/Loader/Loader.jsx";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";

const Catalog = () => {
    const dispatch = useDispatch();

    const allCampers = useSelector(selectAllCampers);
    const campers = useSelector(selectShownCampers);
    const loading = useSelector(selectIsLoading);
    const error = useSelector(selectIsError);
    const filters = useSelector(selectFilters);
    // const favorites = useSelector(selectFavorites);

    useEffect(() => {
        dispatch(resetCampers());
        dispatch(fetchCampersThunk(filters));
    }, [filters, dispatch]);

    return (
        <div className={s.wrapper}>
            <div>
                <Filters/>
            </div>
            <div>{loading ? <Loader className={s.loader} /> : null}</div>

            {error ? <p>Error: {error}</p> : null}

            {!loading && campers.length === 0 && <p>Nothing found.</p>}
            <div>
                <ul className={s.campersList}>
                    {campers.map(camper => (
                        <li key={camper.id} className={s.camperCard}>
                            <img
                                className={s.camperImg}
                                src={camper.gallery[0].thumb}
                                alt={camper.name}
                                width={100}
                                height={100}
                            />
                            <div className={s.camperInfo}>
                                <h2 className={s.camperName}>{camper.name}</h2>
                                <LinesEllipsis
                                    text={camper.description}
                                    maxLine='1'
                                    ellipsis='...'
                                    basedOn='letters'
                                />
                                <ul className={s.camperFeatures}>
                                    {camper.transmission ? (
                                        <li className={s.camperFeaturesItem}>
                                        <svg width={20} height={20}>
                                            <use href="/sprite.svg#icon-diagram" />
                                        </svg>
                                        {camper.transmission}
                                        </li>
                                    ) : ('')}
                                    {camper.engine ? (
                                        <li className={s.camperFeaturesItem}>
                                        <svg width={20} height={20}>
                                            <use href="/sprite.svg#icon-fuel-pump" />
                                        </svg>
                                        {camper.engine}
                                        </li>
                                    ) : ('')}
                                    {camper.kitchen ? (
                                        <li className={s.camperFeaturesItem}>
                                        <svg width={20} height={20}>
                                            <use href="/sprite.svg#icon-cup-hot" />
                                        </svg>
                                        {camper.kitchen}Kitchen
                                        </li>
                                    ) : ('')}
                                    {camper.AC ? (
                                        <li className={s.camperFeaturesItem}>
                                        <svg width={20} height={20}>
                                            <use href="/sprite.svg#icon-wind" />
                                        </svg>
                                        {camper.AC}AC
                                        </li>
                                    ) : ('')}
                                </ul>
                                <button className={s.showMoreBtn}>
                                    <Link
                                        to={`/catalog/${camper.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Show more
                                    </Link>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {allCampers.length > campers.length && (
                <button className={s.loadMoreBtn}>
                    Load more
                </button>
                )}
            </div>
        </div>
    );
};

export default Catalog;