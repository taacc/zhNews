import Index from '../components/pages/index/index'
import NewsDetail from '../components/pages/detail/newsDetail'
import Comments from '../components/pages/comments/comments'
import Collect from '../components/pages/collect/collect'
let routes=[
    {
        path:'/index',
        component:Index
    },
    {
        path:'/newsDetail/:id',
        component : NewsDetail
    },
    {
        path:'/comments/:id',
        component:Comments
    },
    {
        path : '/collect',
        component : Collect
    },
    {
        path:'*',
        redirect:'/index'
    }
]
export default routes