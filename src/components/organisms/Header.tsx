import { Outlet } from 'react-router-dom';
import SignupPopup from '../molecules/SignupPopup';

export default function Header() {
  return (
    <>
      <h1>Header Component</h1>
      <SignupPopup />
      <Outlet />
    </>
  );
}
