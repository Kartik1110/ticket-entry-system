import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Agent from "./components/agent";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import TicketsPage from "./pages/TicketsPage";
import CreateTicket from "./components/createTicket";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

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

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
