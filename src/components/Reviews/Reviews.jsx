import { useLocation } from "react-router-dom";
import s from "./Reviews.module.css";
import Rating from "./Rating.jsx";

const Reviews = () => {
    const location = useLocation();
    const { reviews } = location.state || {};

    if (!reviews || !reviews.length === 0) return <p>No reviews available</p>;

    return (
            <ul className={s.wrapper}>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <div className={s.reviewHeader}>
                            <div className={s.nameLetter}>{review.reviewer_name[0]}</div>
                            <div className={s.reviewNameStars}>
                                <div>{review.reviewer_name}</div>
                                <div>
                                    <Rating rating={review.reviewer_rating} />
                                </div>
                            </div>
                            
                        </div>
                        <p>{review.comment}</p>
                    </li>
                ))}
            </ul>
    );
};

export default Reviews;