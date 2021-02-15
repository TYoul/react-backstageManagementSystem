import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import {
  getRoleListAction,
  manageRoleAddAction,
  setUpAuthorityAction,
} from "../../redux/role/actions";
import { manageRoleUpdate } from "../../services/role";
import dayjs from "dayjs";
import { Card, Button, Table, Modal, Form, Input, message, Tree } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import menuList from "../../components/left-menu/menu-config";

const RolePage: React.FC = () => {
  const dispatch = useDispatch();
  // 角色列表
  const roleList = useSelector((state) => state.role?.roleList);
  // 授权人名称
  const username = useSelector((state) => state.login.user.username);

  // 权限设置弹窗显示
  const [isAuthorityModalVisible, setIsAuthorityModalVisible] = useState(false);
  // 新增角色弹窗显示
  const [isAddRoleModalVisible, setIsAddRoleModalVisible] = useState(false);
  // 树形控件数据
  // 展开的节点
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  // 选中的节点
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  // 自动展开父节点
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  // 权限数据网络请求参数：_id,
  const [_id, setId] = useState("");

  const [form] = Form.useForm();

  // 数据初始化
  useEffect(() => {
    dispatch(getRoleListAction());
  }, [dispatch]);

  // 新增角色弹窗
  const showAddRoleModal = () => {
    setIsAddRoleModalVisible(true);
  };

  // 新增角色弹窗：确认回调
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

  // 新增角色弹窗：取消回调
  const handleAddRoleCancel = () => {
    form.resetFields();
    setIsAddRoleModalVisible(false);
  };

  // 设置权限弹窗
  const showAuthModal = ({ _id }: { _id: string }) => {
    const result = roleList.find((item: any) => item._id === _id);
    if (result) setCheckedKeys(result.menus);
    // debugger;
    setCheckedKeys(result.menus);
    setId(_id);
    setIsAuthorityModalVisible(true);
  };

  // 设置权限弹窗：确认回调
  const handleAuthOk = () => {
    dispatch(
      setUpAuthorityAction({
        _id,
        menus: checkedKeys as string[],
        auth_time: Date.now(),
        auth_name: username,
      })
    );
    setIsAuthorityModalVisible(false);
  };

  // 设置权限弹窗：取消回调
  const handleAuthCancel = () => {
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
      // dataIndex: "operation",
      key: "operation",
      width: "20%",
      align: "center",
      render: (item) => (
        <Button type="link" onClick={(e) => showAuthModal(item)}>
          设置权限
        </Button>
      ),
    },
  ];

  // 树形控件数据
  const treeData = menuList;

  const onExpand = (expandedKeys: React.Key[]) => {
    console.log("onExpand", expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys: any) => {
    console.log("onCheck", checkedKeys);
    setCheckedKeys(checkedKeys);
  };

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
        onOk={handleAuthOk}
        onCancel={handleAuthCancel}
      >
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
        />
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
