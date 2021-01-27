import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  TeamOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

// 项目的菜单配置
const menuList = [
  {
    title: "首页", // 菜单标题名称
    key: "home", // 对应的path
    icon: <HomeOutlined />, // 图标名称
    path: "/home", //对应路径
  },
  {
    title: "商品",
    key: "prod",
    icon: <AppstoreOutlined />,
    children: [
      // 子菜单列表
      {
        title: "分类管理",
        key: "category",
        icon: <BarsOutlined />,
        path: "/prod/category",
      },
      {
        title: "商品管理",
        key: "product",
        icon: <ToolOutlined />,
        path: "/prod/product",
      },
    ],
  },

  {
    title: "用户管理",
    key: "user",
    icon: <UserOutlined />,
    path: "/user",
  },
  {
    title: "角色管理",
    key: "role",
    icon: <TeamOutlined />,
    path: "/role",
  },

  {
    title: "图形图表",
    key: "charts",
    icon: <AreaChartOutlined />,
    children: [
      {
        title: "柱形图",
        key: "bar",
        icon: <BarChartOutlined />,
        path: "/charts/bar",
      },
      {
        title: "折线图",
        key: "line",
        icon: <LineChartOutlined />,
        path: "/charts/line",
      },
      {
        title: "饼图",
        key: "pie",
        icon: <PieChartOutlined />,
        path: "/charts/pie",
      },
    ],
  },
];

export default menuList;
