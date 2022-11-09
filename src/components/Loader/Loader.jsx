import { ImSpinner10 } from 'react-icons/im';
import iconSpin from './Loader.module.css';

export function Loader() {
  return (
    <div>
      <ImSpinner10 size="32" color="#111" className={iconSpin} />
      Завантужуємо...
    </div>
  );
}
