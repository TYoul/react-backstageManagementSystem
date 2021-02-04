import React from "react";
import { shallowEqual } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "../../redux/hooks";

import { Layout } from "antd";
import "./Container.scss";
import logo from "../../assets/logo.svg";

import Header from "../header/Header";
import LeftMenu from "../left-menu/LeftMenu";

// 路由组件
import HomePage from "../../pages/home/Home";
import CategoryPage from "../../pages/category/Category";
import ProductPage from "../../pages/product/Product";
import AddUpdatePage from "../../pages/product/addUpdate/AddUpdate";
import DetailPage from "../../pages/product/detail/Detail";
import UserPage from "../../pages/user/User";
import RolePage from "../../pages/role/Role";
import BarPage from "../../pages/bar/Bar";
import LinePage from "../../pages/line/Line";
import PiePage from "../../pages/pie/Pie";

const ContainerPage: React.FC = () => {
  const login = useSelector((state) => state.login, shallowEqual);
  const { isLogin } = login;

  const { Footer, Sider, Content } = Layout;

  if (!isLogin) return <Redirect to="/login" />;
  return (
    <Layout className="container-wrap">
    <Layout>
<Sider className="sider">
        <div>
          <img src={logo} alt="" className="App-logo" />
          <h1 className="sider-title">React后台管理</h1>
        </div>
        <LeftMenu />
      </Sider>
      <Layout>
        <Header />
        <Content className="content">
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/prod/category" component={CategoryPage} />
            <Route path="/prod/product" component={ProductPage} exact />
            <Route
              path="/prod/product/addUpdate"
              component={AddUpdatePage}
              exact
            />
            <Route
              path="/prod/product/addUpdate/:id"
              component={AddUpdatePage}
            />
            <Route path="/prod/product/detail/:id" component={DetailPage} />
            <Route path="/role" component={RolePage} />
            <Route path="/user" component={UserPage} />
            <Route path="/charts/bar" component={BarPage} />
            <Route path="/charts/line" component={LinePage} />
            <Route path="/charts/pie" component={PiePage} />
            {/* TODO:redirect要写在有"/home"的组件内，不然不会有效果 */}
            <Redirect to="/home" />
          </Switch>
        </Content>
        <Footer className="footer">React后台管理系统@zhou_xu</Footer>
      </Layout>
    </Layout>
      
    </Layout>
  );
};

export default ContainerPage;
