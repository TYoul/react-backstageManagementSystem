import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOutAction } from '../../redux/login/actions';
import { Button, Modal } from 'antd';
import dayjs from 'dayjs';
import './Header.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nowTime, setNowTime] = useState('');

  useEffect(() => {
    // 定时器，每一秒更新页面的时间
    const setTimer = setInterval(() => {
      setNowTime(dayjs().format('YYYY年MM月DD日 HH:mm:ss'));
    }, 1000);
    return () => {
      // 清除定时器
      clearInterval(setTimer);
    };
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  // 退出登录
  const handleOk = () => {
    dispatch(signOutAction());
    setIsModalVisible(false);
  };

  // 不退出登录
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <span className="username">欢迎，adda</span>
        <Button className="sign-out-btn" size="small" onClick={showModal}>
          退出
        </Button>
        <Modal title="提示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消" centered={true}>
          <p>确认退出登录吗?</p>
        </Modal>
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
