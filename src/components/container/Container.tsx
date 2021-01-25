import React from 'react';
// import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';

import { Layout } from 'antd';
import './Container.scss';

import Header from '../header/Header';

// 路由组件
import HomePage from '../../pages/home/Home';
import CategoryPage from '../../pages/category/Category';
import ProductPage from '../../pages/product/Product';
import UserPage from '../../pages/user/User';
import RolePage from '../../pages/role/Role';
import BarPage from '../../pages/bar/Bar';
import LinePage from '../../pages/line/Line';
import PiePage from '../../pages/pie/Pie';

// 测试
// import { getCategory } from '../../services/category';

const ContainerPage: React.FC = () => {
  // const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const { isLogin } = login;

  const { Footer, Sider, Content } = Layout;

  if (!isLogin) return <Redirect to="/login" />;
  return (
    <Layout className="container-wrap">
      <Sider className="sider">Sider</Sider>
      <Layout>
        <Header />
        <Content className="content">
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/prod/category" component={CategoryPage} />
            <Route path="/prod/product" component={ProductPage} />
            <Route path="/role" component={RolePage} />
            <Route path="/user" component={UserPage} />
            <Route path="/charts/bar" component={BarPage} />
            <Route path="/charts/line" component={LinePage} />
            <Route path="/charts/pie" component={PiePage} />
            <Redirect to="/home" />
          </Switch>
        </Content>
        <Footer className="footer">
          React后台管理系统@TYoul
          {/* <button onClick={e => getCategory()}>点我</button> */}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ContainerPage;
