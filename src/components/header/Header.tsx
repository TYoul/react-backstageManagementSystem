import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../redux/login/actions";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import "./Header.scss";

const Header: React.FC = () => {
  const [nowTime, setNowTime] = useState("");

  const dispatch = useDispatch();

  const { confirm } = Modal;

  useEffect(() => {
    // 定时器，每一秒更新页面的时间
    const setTimer = setInterval(() => {
      setNowTime(dayjs().format("YYYY年MM月DD日 HH:mm:ss"));
    }, 1000);
    return () => {
      // TODO:清除定时器
      clearInterval(setTimer);
    };
  });

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

  return (
    <header className="header">
      <div className="header-top">
        <span className="username">欢迎，adda</span>
        <Button className="sign-out-btn" size="small" onClick={showConfirm}>
          退出
        </Button>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">柱状图</div>
        <div className="header-bottom-right">
          <span className="header-timer">现在时间：{nowTime}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
