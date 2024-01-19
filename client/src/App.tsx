import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Agent from "./components/agent";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/agent",
          element: <Agent />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
