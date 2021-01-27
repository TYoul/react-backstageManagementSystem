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

  return (
    <div className="sider-container">
      <Menu defaultSelectedKeys={["home"]} mode="inline" theme="dark">
        {getMenuItem(menuList)}
      </Menu>
    </div>
  );
};

export default LeftMenu;
