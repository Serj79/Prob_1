import Admin from './pages/Admin.js';
import Basket from './pages/Basket';
import {ADMIN_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, DEVICE_ROUTE,INDICATION_ROUTE,CURS_ROUTE} from './utils/constants'
import {BASKET_ROUTE} from './utils/constants'
import Shop from './pages/Shop';
import Authr from './pages/Authr';
import DevicePages from './pages/DevicePages';
import INDICATION from './pages/INDICATION'
import Curs from './pages/Curs'


export const authRoutes = [
{
    path :ADMIN_ROUTE,
    Element :<Admin/>
},
{
    path :BASKET_ROUTE,
    Element :<Basket/>
}
]

export const publicRoutes = [
    {
        path :SHOP_ROUTE,
        Element :<Shop/>
    },
    {
        path :LOGIN_ROUTE,
        Element :<Authr/>
    },
    {
        path :REGISTRATION_ROUTE,
        Element :<Authr/>
    },
    {
        path :DEVICE_ROUTE +'/:id',
        Element :<DevicePages/>
    },
    {
        path :INDICATION_ROUTE ,
        Element :<INDICATION/>
    },
    {
        path :CURS_ROUTE ,
        Element :<Curs/>
    }
]

    
