import React, { useEffect } from "react";
import { useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSelector } from "../../redux/hooks";

import "./Login.scss";

import { getLoginAction } from "../../redux/login/actions";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login, shallowEqual);
  const { isLogin, msg } = login;
  const history = useHistory();

  // 登录提交
  const onFinish = (values: any) => {
    dispatch(getLoginAction(values));
  };

  // 页面初始化，查看是否登录，和之后的对应操作
  useEffect(() => {
    if (isLogin) {
      // TODO:登录时，跳转到home页面，侧边栏默认选中首页
      history.push("/");
    } else if (!isLogin && msg) {
      message.error(msg,1);
    }
  }, [isLogin, history, msg]);

  return (
    <div className="login-wrap">
      <div>
        <div className="form-header">
          <h2>登录</h2>
        </div>
        <div className="form-warp">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入你的用户名!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入你的密码!" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
