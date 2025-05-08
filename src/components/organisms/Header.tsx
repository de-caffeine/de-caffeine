import { Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <h1>Header Component</h1>
      <Outlet />
    </>
  );
}
