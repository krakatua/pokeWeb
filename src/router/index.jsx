import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import Home from "../pages/Home";
import Pokedex from "../pages/Pokedex";
import NotFound from "../pages/NotFound";


const router = createBrowserRouter ([
    {
        path: '/',
        element: <LayoutPublic/>,
        errorElement:<NotFound/>,
        children: [
            {
                index:true,
                element: <Home/>,
                
            },
            {
                path: '/pokedex',
                element: <Pokedex/>,
            }
        ]
    },
   
])

export default router