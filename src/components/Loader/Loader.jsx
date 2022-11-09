import { ImSpinner10 } from 'react-icons/im';
import s from './Loader.module.css';

export function Loader() {
  return (
    <div className={s.loaderBox}>
      <ImSpinner10 size="32" color="#111" className={s.iconSpin} />
    </div>
  );
}
