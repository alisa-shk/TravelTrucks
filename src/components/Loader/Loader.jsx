import { Vortex } from 'react-loader-spinner';
import s from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={s.loader}>
            <Vortex
                visible={true}
                height="200"
                width="200"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
        </div>
    )
};

export default Loader;