import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext.jsx";

import routesForAuthenticatedOnly from "./routesForAuthenticatedOnly";
import routesForNotAuthenticatedOnly from "./routesForNotAuthenticatedOnly.jsx";

const Routes = () => {
    const { token } = useAuth();
    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
      ]);

      // Provide the router configuration using RouterProvider
      return <RouterProvider router={router} />;
};

export default Routes;