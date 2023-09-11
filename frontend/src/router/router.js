import Publications from "../pages/Publications";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import Reviews from "../pages/Reviews";
import CreatePublication from "../pages/CreatePublication";
import CurrentPublication from "../pages/CurrentPublication";
import Resume from "../pages/Resume";
import NotFound from "../pages/NotFound";
import Welcome from "../pages/Welcome";
import Profile from "../pages/Profile";
import FillResume from "../pages/FillResume";


export const privateRoutes = [
    {path: "/", element: <Welcome/>},
    {path: "/publications", element: <Publications/>},
    {path: "/publications/:id", element: <CurrentPublication/>},
    {path: "/reviews", element: <Reviews/> },
    {path: "/publications/add", element: <CreatePublication/>},
    {path: "/resume/:id", element: <Resume/>},
    {path: "/error", element: <NotFound/>},
    {path: "/profile", element: <Profile/>},
    {path: "/resume/add", element: <FillResume/>}
]

export const publicRoutes = [
    {path: "/", element: <Welcome/>},
    {path: "/publications", element: <Publications/>},
    {path: "/publications/:id", element: <CurrentPublication/>},
    {path: "/registration", element: <Registration/>},
    {path: "/login", element: <Login/>},
    {path: "error", element: <NotFound/>},
]