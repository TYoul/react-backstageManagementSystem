import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, shallowEqual } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useHistory } from "react-router-dom";
import { signOutAction } from "../../redux/login/actions";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import "./Header.scss";
import menuList from "../left-menu/menu-config";

const Header: React.FC = () => {
  const [nowTime, setNowTime] = useState("");
  const [title, setTitle] = useState("");
  const history = useHistory();
  const username = useSelector(
    (state) => state.login.user.username,
    shallowEqual
  );

  const dispatch = useDispatch();

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "确定退出登录吗?",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        dispatch(signOutAction());
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // TODO:根据路由和侧边栏数据来动态获取每块内容的头部标题,
  // 由于定时器会导致组件的时间更新，所以这个组件会一直render，将getTitle函数放到useCallback中，防止其多次调用
  // TODO:另一种方法：利用redux，当点击侧边栏菜单时，将对应的数据放到redux中，在这边取出来。但是放在ComponentDidMount取出来，为了刷新的时候有数据，没刷新，从redux中拿，刷新从自身拿
  const getTitle = useCallback(() => {
    const pathKey =
      history.location.pathname.indexOf("product") !== -1
        ? "product"
        : history.location.pathname.split("/").reverse()[0];
    let title = "";
    menuList.forEach((item: any) => {
      if (item.children) {
        let tmp = item.children.find((citem: any) => {
          return citem.key === pathKey;
        });
        if (tmp) title = tmp.title;
      } else {
        if (item.key === pathKey) title = item.title;
      }
    });
    return title;
  }, [history.location.pathname]);

  useEffect(() => {
    // 定时器，每一秒更新页面的时间
    const setTimer = setInterval(() => {
      setNowTime(dayjs().format("YYYY年MM月DD日 HH:mm:ss"));
    }, 1000);
    setTitle(getTitle());
    return () => {
      // TODO:清除定时器
      clearInterval(setTimer);
    };
  }, [getTitle]);

  return (
    <header className="header">
      <div className="header-top">
        <span className="username">欢迎，{username}</span>
        <Button
          className="sign-out-btn"
          size="small"
          onClick={(e) => showConfirm()}
        >
          退出
        </Button>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span className="header-timer">现在时间：{nowTime}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
