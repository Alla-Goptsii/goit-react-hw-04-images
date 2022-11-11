import { ImSpinner10 } from 'react-icons/im';
import { LoaderBox } from './Loader.styled';

export function Loader() {
  return (
    <LoaderBox>
      <ImSpinner10
        size="50"
        margin-right="10"
        animation="iconSpin 2s infinite linear"
        position="fixed"
        width="40"
        height="40"
        display="flex"
        align-items="center"
        justify-content="center"
      />
    </LoaderBox>
  );
}
