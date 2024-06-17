import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Post from "./pages/Post";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Error from "./components/Error";
// import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Edit from "./pages/Edit";

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <Post />,
      },
      {
        path: "/:id/edit",
        element: <Edit />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </QueryClientProvider>
  );
}

export default App;