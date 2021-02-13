import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import {
  getRoleListAction,
  manageRoleAddAction,
} from "../../redux/role/actions";
import dayjs from "dayjs";
import { Card, Button, Table, Modal, Form, Input, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";

const RolePage: React.FC = () => {
  const dispatch = useDispatch();
  const roleList = useSelector((state) => state.role?.roleList);

  const [isAuthorityModalVisible, setIsAuthorityModalVisible] = useState(false);
  const [isAddRoleModalVisible, setIsAddRoleModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getRoleListAction());
  }, [dispatch]);

  const showAddRoleModal = () => {
    setIsAddRoleModalVisible(true);
  };

  const handleAddRoleOk = async () => {
    try {
      const { roleName } = await form.validateFields();
      dispatch(manageRoleAddAction(roleName));
      setIsAddRoleModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.warning("表单输入有误，请检查", 1);
      return;
    }
  };

  const handleAddRoleCancel = () => {
    form.resetFields();
    setIsAddRoleModalVisible(false);
  };

  const showModal = () => {
    setIsAuthorityModalVisible(true);
  };

  const handleOk = () => {
    setIsAuthorityModalVisible(false);
  };

  const handleCancel = () => {
    setIsAuthorityModalVisible(false);
  };

  const dataSource = roleList;

  const columns: ColumnsType<any> = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
      width: "20%",
      align: "center",
    },
    {
      title: "创建时间",
      // dataIndex: "create_time",
      key: "create_time",
      width: "25%",
      align: "center",
      render: ({ create_time }) =>
        dayjs(create_time).format("YYYY年MM月DD日 HH:mm:ss"),
    },
    {
      title: "授权时间",
      // dataIndex: "auth_time",
      key: "auth_time",
      width: "25%",
      align: "center",
      render: ({ auth_time }) =>
        auth_time ? dayjs(auth_time).format("YYYY年MM月DD日 HH:mm:ss") : "",
    },
    {
      title: "授权人",
      dataIndex: "auth_name",
      key: "auth_name",
      width: "20%",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      width: "20%",
      align: "center",
      render: () => (
        <Button type="link" onClick={showModal}>
          设置权限
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={
        <Button type="primary" onClick={showAddRoleModal}>
          <PlusOutlined />
          新增角色
        </Button>
      }
    >
      <Table bordered dataSource={dataSource} rowKey="_id" columns={columns} />
      <Modal
        title="设置权限"
        cancelText="取消"
        okText="确认"
        visible={isAuthorityModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <Modal
        title="添加角色"
        cancelText="取消"
        okText="确认"
        visible={isAddRoleModalVisible}
        onOk={handleAddRoleOk}
        onCancel={handleAddRoleCancel}
      >
        <Form form={form}>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: "角色名称必须输入" }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default RolePage;
