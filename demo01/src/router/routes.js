// 导入文件时, 如果没有 ./, 默认从node_modules查找文件
import routesComponent from './routesComponent.js'

//路由配置
export default [{
		path: '/to',
		name: 'toDo',
		component: routesComponent.toDo
	},
	{
		path: '/test',
		name: 'test',
		component: routesComponent.test
	},
	{
		path: '/login',
		name: 'Login',
		component: routesComponent.Login
	},
	{
		path: '/register',
		name: 'Register',
		component: routesComponent.Register
	},

	{
		path: '/search',
		name: 'Search',
		component: routesComponent.Search
	},

	{
		path: '/',
		name: 'Main',
		component: routesComponent.Main,
		children: [{
				path: '/goods',
				name: 'goods',
				component: routesComponent.goods,
			},
			{
				path: '/classify',
				name: 'Classify',
				component: routesComponent.Classify,
				children: [
					{
						path: '/classify/product1',
						name: 'Product1',
						component: routesComponent.Product1,
					},
					{
						path: '/menu',
						name: 'Menu',
						component: routesComponent.Menu,
					},
					{
						path: '/ny',
						name: 'Ny',
						component: routesComponent.Ny,
					},
					{
						path: '/mz',
						name: 'Mz',
						component: routesComponent.Mz,
					},
					{
						path: '/ps',
						name: 'Ps',
						component: routesComponent.Ps,
					},
					{
						path: '/xp',
						name: 'Xp',
						component: routesComponent.Xp,
					},
					{
						path: '/xb',
						name: 'Xb',
						component: routesComponent.Xb,
					},
					{
						path: '/et',
						name: 'Et',
						component: routesComponent.Et,
					},
					{
						path: '/my',
						name: 'My',
						component: routesComponent.My,
					},
					{
						path: '/jujia',
						name: 'JuJia',
						component: routesComponent.JuJia,
					},
					{
						path: '/meishi',
						name: 'MeiShi',
						component: routesComponent.MeiShi,
					},
					{
						path: '/shuma',
						name: 'ShuMa',
						component: routesComponent.ShuMa,
					},
					{
						path: '/jiadian',
						name: 'JiaDian',
						component: routesComponent.JiaDian,
					},
				]
			},
			{
				path: '/mine',
				name: 'Mine',
				component: routesComponent.Mine,
			},
			{
				path: '/shopcart',
				name: 'Shopcart',
				component: routesComponent.Shopcart,
			},
			{
				path: '*',
				redirect: {
					name: 'test'
				}
			}
		]
	},
	{
		path: '/detail/:pid/:tname',
		name: 'Detail',
		component: routesComponent.Detail
	},
	{
		path: '/order/:active',
		name: 'Order',
		component: routesComponent.Order
	},
	{
		path: '/setuser',
		name: 'SetUser',
		component: routesComponent.SetUser
	},
	{
		path: '/member',
		name: 'Member',
		component: routesComponent.Member
	},
	{
		path: '/mcenter',
		name: 'Mcenter',
		component: routesComponent.Mcenter
	},
	{
		path: '/exit',
		name: 'Exit',
		component: routesComponent.Exit
	}
]