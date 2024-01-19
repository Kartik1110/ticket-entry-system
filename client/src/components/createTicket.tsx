import { Link } from "react-router-dom";
import Card from "./common/Card";

function CreateTicket() {
  const onHandleSignIn = () => {};

  return (
    <div className="flex h-[92vh] w-screen">
      <div className="w-[100vw] flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-800">
        <Link
          to={"/ticket"}
          className="my-5 w-auto bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
        >
          See All Tickets
        </Link>
        <Card>
          <div className="mb-5 float-left text-left">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Create Ticket</h2>
              <span className="text-white pr-2">Do not have an agent?</span>
              <a href={"/agent"} className="text-blue-600 hover:text-blue-500 hover:cursor-pointer">
                Create agent
              </a>
            </div>

            <div className="mb-6">
              <label htmlFor="topic" className="text-sm text-gray-400">
                Topic:
              </label>
              <input
                type="topic"
                id="topic"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="text-sm text-gray-400">
                Description:
              </label>
              <input
                type="description"
                id="description"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="text-sm text-gray-400">
                Type:
              </label>
              <input
                type="type"
                id="type"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="severity" className="text-sm text-gray-400">
                Severity:
              </label>
              <input
                type="severity"
                id="severity"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="status" className="text-sm text-gray-400">
                Status:
              </label>
              <input
                type="status"
                id="status"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={onHandleSignIn}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Create Ticket
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreateTicket;
