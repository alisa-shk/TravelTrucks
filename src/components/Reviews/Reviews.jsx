import { useLocation } from "react-router-dom";

const Reviews = () => {
    const location = useLocation();
    const { reviews } = location.state || {};

    if (!reviews || !reviews.length === 0) return <p>No reviews available</p>;

    return (
        <div>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <div>{review.reviewer_name}</div>
                    </li>
                // <div key={index} style={{ marginBottom: "16px" }}>
                //     <p>
                //     <strong>{review.reviewer_name}</strong> ({review.reviewer_rating}/5)
                //     </p>
                //     <p>{review.comment}</p>
                // </div>
                ))}
            </ul>
        </div>
    );
};

export default Reviews;