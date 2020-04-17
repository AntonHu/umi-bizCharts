/** @ 代表src路径 . 代表pages路径 */
export default [
    {
        path: '/',
        component: '@/layouts',
        routes: [
            {
                title: '主页',
                path: '/',
                component: '@/pages/homepage'
            },
            {
                title: '出错了',
                path: '*',
                component: '@/pages/404'
            }
        ]
    },
    {
        title: '出错了',
        path: '*',
        component: '@/pages/404'
    }
];
