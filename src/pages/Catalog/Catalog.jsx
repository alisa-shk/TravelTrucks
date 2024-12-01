import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampersThunk, loadMoreCampers, resetCampers, toggleFavorite } from "../../redux/slice.js";
import { selectAllCampers, selectFilters, selectIsError, selectIsLoading, selectShownCampers, selectFavorites } from "../../redux/selectors.js";
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
    const favorites = useSelector(selectFavorites);

    useEffect(() => {
        dispatch(resetCampers());
        dispatch(fetchCampersThunk(filters));
    }, [filters, dispatch]);

    const handleToggleFavorite = camper => {
        dispatch(toggleFavorite(camper));
    };
    
    const handleLoadMore = () => {
        const moreCampers = allCampers.slice(campers.length, campers.length + 4);
        dispatch(loadMoreCampers(moreCampers));
    };

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
                            />
                            <div className={s.camperInfo}>
                                <div className={s.camperTitle}>
                                    <h2 className={s.camperName}>{camper.name}</h2>
                                    <div className={s.priceFav}>
                                        <p className={s.camperName}>€{camper.price.toFixed(2)}</p>
                                        <button
                                            onClick={() => handleToggleFavorite(camper)}
                                            className={s.favBtn}
                                            >
                                            <svg
                                                className={`${s.favIcon} ${
                                                favorites.some(fav => fav.id === camper.id)
                                                    ? s.active
                                                    : ''
                                                }`}
                                            >
                                                <use href="/sprite.svg#icon-heart"></use>
                                            </svg>
                                            {favorites.some(fav => fav.id === camper.id)}
                                        </button>
                                    </div>
                                </div>
                                <div className={s.camperRatLoc}>
                                    <div className={s.camperRating}>
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
                                        <path
                                            d="M7.55778 0.838169C7.74538 0.482595 8.25462 0.482596 8.44222 0.838169L10.3305 4.41705C10.4028 4.55417 10.5347 4.64997 10.6874 4.67641L14.6747 5.36629C15.0708 5.43484 15.2282 5.91915 14.948 6.20745L12.1277 9.10921C12.0197 9.22039 11.9693 9.3754 11.9914 9.52886L12.5674 13.5341C12.6246 13.932 12.2126 14.2314 11.8519 14.054L8.22062 12.2685C8.0815 12.2001 7.9185 12.2001 7.77938 12.2685L4.14815 14.054C3.78737 14.2314 3.37539 13.932 3.43262 13.5341L4.00861 9.52886C4.03068 9.3754 3.98031 9.22039 3.87226 9.10921L1.05204 6.20745C0.771841 5.91915 0.929206 5.43484 1.32535 5.36629L5.31256 4.67641C5.46533 4.64997 5.59719 4.55417 5.66954 4.41705L7.55778 0.838169Z"
                                            fill="#FFC531"
                                        />
                                    </svg>
                                    <p>{camper.rating}({camper.reviews.length} Reviews)</p>
                                    </div>
                                    <div className={s.camperLocation}>
                                        <svg className={s.iconMap} width={16} height={16}>
                                            <use href="/sprite.svg#icon-map" />
                                        </svg>
                                        <p>{camper.location}</p>
                                    </div>
                                </div>
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
                <button className={s.loadMoreBtn} onClick={handleLoadMore}>
                    Load more
                </button>
                )}
            </div>
        </div>
    );
};

export default Catalog;