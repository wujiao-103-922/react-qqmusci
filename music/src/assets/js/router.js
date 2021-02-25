import Index from '../../components/Index'
import Login from '../../components/Login'
import Register from '../../components/Register'

//二级路由
import Recomment from '../../components/index/Recommend'
import Hot from '../../components/index/Hot'
import Search from '../../components/index/Search'

const routesdata = [{
        path: '/login',
        component: Login,
        exact: false,
        needlogin: false
    }, {
        path: '/register',
        component: Register,
        exact: false,
        needlogin: false
    },
    {
        path:'/songlist/:id',
        component:Hot,
        exact:false,
        needlogin:false
    },
    {
        path: '/',
        component: Index,
        exact: false,
        needlogin: true, //进入首页需要先判断是否已登录
        // 值为true  要登录后才能进入该路由
        children: [{
                path: '/recommend',
                component: Recomment,
                exact: false
            },
            {
                path: '/hot',
                component: Hot,
                exact: false
            },
            {
                path: '/search',
                component: Search,
                exact: false
            },
            {
                path: '*',
                redirect: '/recommend'//地址重定向
            }

        ]
    }
]

export default routesdata