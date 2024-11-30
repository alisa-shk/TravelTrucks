import { useLocation } from "react-router-dom";

const Features = () => {
    const location = useLocation();
    const { features } = location.state || {};
    if (!features) return <p>No features available</p>;

    return (
        <div>
            <ul>
                {features.AC && <li>Air Conditioning</li>}
                {features.bathroom && <li>Bathroom</li>}
                {features.kitchen && <li>Kitchen</li>}
                {features.radio && <li>Radio</li>}
                {features.TV && <li>TV</li>}
                {/* Додайте інші особливості */}
            </ul>
        </div>
    );
};

export default Features;