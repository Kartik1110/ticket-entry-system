import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Agent from "./components/agent";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import TicketsPage from "./pages/TicketsPage";
import CreateTicket from "./components/createTicket";

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
        {
          path: "/ticket",
          element: <TicketsPage />,
        },
        {
          path: "/create-ticket",
          element: <CreateTicket />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
