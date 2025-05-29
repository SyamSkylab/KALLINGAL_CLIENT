import { createBrowserRouter } from "react-router-dom";
import { Login } from "./login";
import { Reg } from "./Reg";
import { ProtectedLayout } from "./contexts/protectedLayout";
import { Land } from "./Land";
import { Booking } from "./Booking";
import { Admin } from './Admin'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Land />
    },
    {
        path: '/book',
        element: <Booking />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/reg',
        element: <Reg />
    },

    {
        element: <ProtectedLayout />,
        children: [{
            path: '/home',
            element: <Admin />
        }]
    }

])

export default router