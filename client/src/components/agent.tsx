import Card from "./common/Card";

function Agent() {
  const onHandleSignIn = () => {};

  return (
    <div className="flex h-[92vh] w-screen ">
      <div className="w-[100vw] flex items-center justify-center bg-gradient-to-r from-black to-gray-800">
        <Card>
          <div className="mb-5 float-left text-left">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold">Create Agent</h2>
              <span className="text-white pr-2">Already have an agent?</span>
              <a
                href={"/ticket"}
                className="text-blue-600 hover:text-blue-500 hover:cursor-pointer"
              >
                Create ticket
              </a>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-400">
                Name:
              </label>
              <input
                type="name"
                id="name"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md active:bg-inherit focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-sm text-gray-400">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md active:bg-inherit focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="text-sm text-gray-400">
                Phone:
              </label>
              <input
                type="phone"
                id="phone"
                className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md active:bg-inherit focus:outline-none focus:border-blue-500"
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

            <button
              onClick={onHandleSignIn}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
            >
              Create Agent
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Agent;
