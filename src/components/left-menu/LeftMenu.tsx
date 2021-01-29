import React from "react";
import { useHistory } from "react-router-dom";
import "./LeftMenu.scss";
import menuList from "./menu-config";
import { Menu } from "antd";

const { SubMenu, Item } = Menu;

const LeftMenu: React.FC = () => {
  const history = useHistory();

  const handleReplace = (path: string) => {
    history.replace(path);
  };

  // 用于菜单获取的函数
  const getMenuItem = (menuList: any) => {
    return menuList.map((menu: any) =>
      menu.children ? (
        <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
          {getMenuItem(menu.children)}
        </SubMenu>
      ) : (
        <Item
          key={menu.key}
          icon={menu.icon}
          onClick={(e) => handleReplace(menu.path)}
        >
          {menu.title}
        </Item>
      )
    );
  };

  // TODO：对页面刷新做了侧边栏数据回显的操作，通过路由来确定侧边栏选中的标签
  return (
    <div className="sider-container">
      <Menu
        // TODO:默认选中 reverse是要选取数组的最后一个元素，当url是localhost:3000时，默认选择/home，路由在container做了处理
        defaultSelectedKeys={[
          history.location.pathname.split("/").reverse()[0] || "home",
        ]}
        // TODO:默认打开
        defaultOpenKeys={history.location.pathname.split("/").splice(1, 2)}
        mode="inline"
        theme="dark"
      >
        {getMenuItem(menuList)}
      </Menu>
    </div>
  );
};

export default LeftMenu;
