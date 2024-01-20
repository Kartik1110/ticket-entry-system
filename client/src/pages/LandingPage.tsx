import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex h-[92vh] w-screen ">
      <div className="w-[100vw] flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-800">
        <h1 className="text-8xl text-white mb-10">Hey there 👋</h1>
        <h3 className="text-4xl text-white mb-10">New here? Start by creating an agent!!</h3>
        <div className="mb-5">
          <Link
            to={"/create-ticket"}
            className="p-6 text-white text-lg rounded-lg bg-blue-600 hover:bg-blue-500 hover:cursor-pointer"
          >
            Create Agent
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
