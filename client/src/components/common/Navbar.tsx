import { Link, NavLink } from "react-router-dom";
import { NAV_TABS } from "../../constants";

function Navbar() {
  return (
    <div className="h-[8vh] w-screen bg-gray-900 p-4 flex items-center justify-between">
      <Link to="/">
        <span className="text-xl text-white font-semibold px-3">Shvasa</span>
      </Link>

      <div className="flex items-center justify-between">
        {NAV_TABS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive, isPending }) =>
              isActive
                ? "px-3 text-blue-500"
                : isPending
                ? "pending"
                : "px-3 text-white hover:text-blue-500"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
