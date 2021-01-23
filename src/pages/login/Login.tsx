import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector } from '../../redux/hooks';

import './Login.scss';

import { getLoginAction } from '../../redux/login/actions';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const { isLogin, msg } = login;
  const history = useHistory();

  const onFinish = (values: any) => {
    dispatch(getLoginAction(values));
  };

  useEffect(() => {
    if (isLogin) {
      history.push('/');
    } else if (!isLogin && msg) {
      message.error(msg);
    }
  }, [isLogin, history, msg]);

  return (
    <div className="login-wrap">
      <div>
        <div className="form-header">
          <h2>登录</h2>
        </div>
        <div className="form-warp">
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入你的用户名!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入你的密码!' }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
