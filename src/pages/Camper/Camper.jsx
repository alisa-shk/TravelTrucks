import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { selectIsError, selectIsLoading, selectSelectedCamper } from "../../redux/selectors.js";
import { useEffect } from "react";
import { fetchCamperByIdThunk } from "../../redux/slice.js";
import clsx from "clsx";
import s from "./Camper.module.css";
import BookingForm from "../../components/BookingForm/BookingForm.jsx";


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
    if (!camper) return <p>Camper not found</p>;

    const buildLinkClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
    };

    return (
        <div className={s.wrapper}>
            <h1 className={s.camperName}>{camper.name}</h1>
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
            <p className={s.camperPrice}>€{camper.price.toFixed(2)}</p>
            <div className={s.camperImgWrapper}>
                {camper.gallery.map((image, index) => (
                    <img
                        className={s.camperImg}
                        key={index}
                        src={image.original}
                        alt={`${camper.name} - ${index + 1}`}
                    />
                ))}
            </div>
            <p className={s.camperDescr}>{camper.description}</p>
            <div className={s.featuresReviews}>
                <NavLink className={buildLinkClass} to="features" state={{ features: camper }}>Features</NavLink>
                <NavLink className={buildLinkClass} to="reviews" state={{ reviews: camper.reviews }}>Reviews</NavLink>
            </div>
            <div className={s.divider}></div>
            <div className={s.featRevBook}>
                <Outlet />
                <BookingForm />
            </div>
        </div>
    );
};

export default Camper;