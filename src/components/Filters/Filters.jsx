import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setFilters, setTempFilters } from "../../redux/slice.js";
import s from "./Filters.module.css";

const Filters = () => {
    const dispatch = useDispatch();
    const tempFilters = useSelector((state) => state.campers.tempFilters);

    const handleTempFilterChange = (filterName, value) => {
        dispatch(setTempFilters({... tempFilters, [filterName]: value,}));
    };

    const applyFilters = () => {
        const activeFilters = Object.entries(tempFilters).reduce(
            (acc, [key, value]) => {
                if (value) acc[key] = value;
                return acc;
            }, {} 
        );
        dispatch(setFilters(activeFilters));
    };

    const resetAllFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <div className={s.wrapper}>
            <div className={s.location}>
                <p className={s.locText}>Location</p>
                <div className={s.inputCont}>
                    <input
                        className={s.input}
                        type="text"
                        id="location"
                        placeholder="City"
                        value={tempFilters.location || ''}
                        onChange={e => handleTempFilterChange('location', e.target.value)}
                    />
                    <svg className={s.inputIcon} width={20} height={20}>
                        <use href="/sprite.svg#icon-map" />
                    </svg>
                </div>
            </div>
            <div className={s.filtersContainer}>
                <p className={s.filtersText}>Filters</p>
                <div className={s.filterSection}>
                    <h3 className={s.filterSectionTitle}>Vehicle equipment</h3>
                    <div className={s.divider}></div>
                    <div className={s.filterButtons}>
                        <button
                            className={`${s.filterBtn} ${tempFilters.AC ? s.active : ''}`}
                            onClick={() => handleTempFilterChange('AC', !tempFilters.AC)}
                            >
                            <svg width={32} height={32}>
                                <use href="/sprite.svg#icon-wind" />
                            </svg>
                            <p>AC</p>
                        </button>
                        <button
                            className={`${s.filterBtn} ${tempFilters.transmission ? s.active : ''}`}
                            onClick={() => handleTempFilterChange('transmission', tempFilters.transmission === 'automatic' ? '' : 'automatic')}
                            >
                            <svg width={32} height={32}>
                                <use href="/sprite.svg#icon-diagram" />
                            </svg>
                            <p>Automatic</p>
                        </button>
                        <button
                            className={`${s.filterBtn} ${tempFilters.kitchen ? s.active : ''}`}
                            onClick={() => handleTempFilterChange('kitchen', !tempFilters.kitchen)}
                            >
                            <svg width={32} height={32}>
                                <use href="/sprite.svg#icon-cup-hot" />
                            </svg>
                            <p>Kitchen</p>
                        </button>
                        <button
                            className={`${s.filterBtn} ${tempFilters.TV ? s.active : ''}`}
                            onClick={() => handleTempFilterChange('TV', !tempFilters.TV)}
                            >
                            <svg width={32} height={32}>
                                <use href="/sprite.svg#icon-tv" />
                            </svg>
                            <p>TV</p>
                        </button>
                        <button
                            className={`${s.filterBtn} ${tempFilters.bathroom ? s.active : ''}`}
                            onClick={() => handleTempFilterChange('bathroom', !tempFilters.bathroom)}
                            >
                            <svg width={32} height={32}>
                                <use href="/sprite.svg#icon-shower" />
                            </svg>
                            <p>Bathroom</p>
                        </button>
                    </div>
                </div>
                <div className={s.filterSection}>
                    <h3>Vehicle type</h3>
                    <div className={s.divider}></div>
                    <div className={s.filterButtons}>
                        <button
                            className={`${s.filterBtn} ${tempFilters.form === 'panelTruck' ? s.active : ''}`}
                            onClick={() => handleTempFilterChange('form', tempFilters.form === 'panelTruck' ? '' : 'panelTruck')}
                            >
                            <svg width={32} height={32}>
                                <use href="/sprite.svg#icon-grid-1x2" />
                            </svg>
                            <p>Van</p>
                        </button>
                        <button
                            className={`${s.filterBtn} ${tempFilters.form === 'fullyIntegrated' ? s.active : ''}`}
                            onClick={() => handleTempFilterChange('form', tempFilters.form === 'fullyIntegrated' ? '' : 'fullyIntegrated')}
                            >
                            <svg width={32} height={32}>
                                <use href="/sprite.svg#icon-grid" />
                            </svg>
                            <p>Fully Integrated</p>
                        </button>
                        <button
                            className={`${s.filterBtn} ${tempFilters.form === 'alcove' ? s.active : ''}`}
                            onClick={() => handleTempFilterChange('form', tempFilters.form === 'alcove' ? '' : 'alcove')}
                            >
                            <svg width={32} height={32}>
                                <use href="/sprite.svg#icon-gap" />
                            </svg>
                            <p>Alcove</p>
                        </button>
                    </div>
                </div>
                <button
                    className={s.searchButton}
                    onClick={applyFilters}
                    >Search
                </button>
                <button
                    className={s.resetButton}
                    onClick={resetAllFilters}
                    >Reset
                </button>
                
            </div>
        </div>
    );
};

export default Filters;