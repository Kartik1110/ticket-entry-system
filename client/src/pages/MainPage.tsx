import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";

function MainPage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainPage;
