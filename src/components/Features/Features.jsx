import { useLocation } from "react-router-dom";
import s from "./Features.module.css";

const Features = () => {
    const location = useLocation();
    const { features } = location.state || {};
    if (!features) return <p>No features were added</p>;

    return (
        <div className={s.wrapper}>
            <ul className={s.featuresList}>
            {features.transmission && (
                <li className={s.listItem}>
                    <svg width={20} height={20}>
                        <use href="/sprite.svg#icon-diagram" />
                    </svg>
                    {features.transmission}
                </li>
            )}
            {features.AC && (
                <li className={s.listItem}>
                    <svg width={20} height={20}>
                        <use href="/sprite.svg#icon-wind" />
                    </svg>
                    AC{features.AC}
                </li>
            )}
            {features.engine && (
                <li className={s.listItem}>
                    <svg width={20} height={20}>
                        <use href="/sprite.svg#icon-fuel-pump" />
                    </svg>
                    {features.engine}
                </li>
            )}
            {features.kitchen && (
                <li className={s.listItem}>
                    <svg width={20} height={20}>
                        <use href="/sprite.svg#icon-cup-hot" />
                    </svg>
                    kitchen{features.kitchen}
                </li>
            )}
            {features.bathroom && (
                <li className={s.listItem}>
                    <svg width={20} height={20}>
                        <use href="/sprite.svg#icon-shower" />
                    </svg>
                    bathroom{features.bathroom}
                </li>
            )}
            {features.radio && (
                <li className={s.listItem}>
                    <svg width={20} height={20}>
                        <use href="/sprite.svg#icon-radio" />
                    </svg>
                    radio{features.radio}
                </li>
            )}
            {features.refrigerator && (
                <li className={s.listItem}>
                    <svg width={20} height={20}>
                        <use href="/sprite.svg#icon-solar_fridge-outline" />
                    </svg>
                    refrigerator{features.refrigerator}
                </li>
            )}
            {features.microwave && (
                <li className={s.listItem}>
                    <svg width="20" height="20" fill="none">
                        <path
                            d="M15.6667 1.33331H2.33335C1.41288 1.33331 0.666687 2.07951 0.666687 2.99998V12.1666C0.666687 13.0871 1.41288 13.8333 2.33335 13.8333H15.6667C16.5872 13.8333 17.3334 13.0871 17.3334 12.1666V2.99998C17.3334 2.07951 16.5872 1.33331 15.6667 1.33331Z"
                            stroke="#101828"
                        />
                        <path
                            d="M9.83333 4.66669H4.83333C4.3731 4.66669 4 5.03978 4 5.50002V9.66669C4 10.1269 4.3731 10.5 4.83333 10.5H9.83333C10.2936 10.5 10.6667 10.1269 10.6667 9.66669V5.50002C10.6667 5.03978 10.2936 4.66669 9.83333 4.66669Z"
                            stroke="#101828"
                        />
                        <path
                            d="M14 4.66669V10.5M4 13.8334V15.5M14 13.8334V15.5"
                            stroke="#101828"
                        />
                    </svg>
                    microwave{features.microwave}
                </li>
            )}
            {features.gas && (
                <li className={s.listItem}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M4.99999 15.8334H8.33332M15 15.8409V15.8334M1.66666 5.00002C1.66666 2.24169 2.24166 1.66669 4.99999 1.66669H15C17.7583 1.66669 18.3333 2.24169 18.3333 5.00002V15C18.3333 17.7584 17.7583 18.3334 15 18.3334H4.99999C2.24166 18.3334 1.66666 17.7584 1.66666 15V5.00002Z"
                            stroke="#101828"
                        />
                        <path
                            d="M9.99999 11.6667C11.8409 11.6667 13.3333 10.1743 13.3333 8.33333C13.3333 6.49238 11.8409 5 9.99999 5C8.15904 5 6.66666 6.49238 6.66666 8.33333C6.66666 10.1743 8.15904 11.6667 9.99999 11.6667Z"
                            stroke="#101828"
                        />
                        <path
                            d="M12.9166 8.33335H14.1666M9.99998 11.25V12.5M7.08331 8.33335H5.83331M9.99998 5.41669V4.16669"
                            stroke="#101828"
                        />
                    </svg>
                    gas{features.gas}
                </li>
            )}
            {features.water && (
                <li className={s.listItem}>
                    <svg width="20" height="20" fill="none">
                        <path
                            d="M15.625 12.5C15.625 15.952 13.452 18.125 10 18.125C6.54805 18.125 4.375 15.952 4.375 12.5C4.375 8.79571 8.40742 3.79492 9.64414 2.34844C9.68815 2.29705 9.74276 2.25579 9.80422 2.2275C9.86568 2.19922 9.93254 2.18457 10.0002 2.18457C10.0679 2.18457 10.1347 2.19922 10.1962 2.2275C10.2576 2.25579 10.3122 2.29705 10.3562 2.34844C11.5926 3.79492 15.625 8.79571 15.625 12.5Z"
                            stroke="#101828"
                        />
                        <path
                            d="M13.4375 12.8125C13.4375 13.5584 13.1412 14.2738 12.6137 14.8012C12.0863 15.3287 11.3709 15.625 10.625 15.625"
                            stroke="#101828"
                        />
                    </svg>
                    water{features.water}
                </li>
            )}
            </ul>
            <h3 className={s.detailsTitle}>Vehicle details</h3>
            <div className={s.divider}></div>
            <ul className={s.detailsList}>
                {features.form && (
                    <li className={s.detailsListItem}>
                        <p>Form</p>
                        {features.form}
                    </li>
                )}
                {features.length && (
                    <li className={s.detailsListItem}>
                        <p>Length</p>
                        {features.length}
                    </li>
                )}
                {features.width && (
                    <li className={s.detailsListItem}>
                        <p>Width</p>
                        {features.width}
                    </li>
                )}
                {features.height && (
                    <li className={s.detailsListItem}>
                        <p>Height</p>
                        {features.height}
                    </li>
                )}
                {features.tank && (
                    <li className={s.detailsListItem}>
                        <p>Tank</p>
                        {features.tank}
                    </li>
                )}
                {features.consumption && (
                    <li className={s.detailsListItem}>
                        <p>Consumption</p>
                        {features.consumption}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Features;