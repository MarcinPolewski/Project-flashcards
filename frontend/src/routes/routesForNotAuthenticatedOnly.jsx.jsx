import ForgotPassword from "../Components/pages/ForgotPassword/ForgotPassword";
import PasswordReset from "../Components/pages/ForgotPassword/PasswordReset";
import Login from "../Components/pages/Login/Login";
import Register from "../Components/pages/Register/Register";
import VerificationSuccess from "../Components/pages/VerificationSuccess/VerificationSuccess";

const routesForNotAuthenticatedOnly = [
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword/>,
    },
    {
        path: "/password-reset/:email",
        element: <PasswordReset/>,
    },
    {
        path: "/verify-email/:email/:code",
        element: <VerificationSuccess/>,
    },
];

export default routesForNotAuthenticatedOnly;