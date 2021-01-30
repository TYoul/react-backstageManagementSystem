import React, { useState, useEffect } from "react";
import { useDispatch, shallowEqual } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { Button, Card, Table, Modal, Form, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";

import { PAGE_SIZE } from "../../config";

import { getCategoryListAction } from "../../redux/category/actions";

const CategoryPage: React.FC = () => {
  // redux hook
  const dispatch = useDispatch();
  const categoryList = useSelector(
    (state) => state.category.categoryList,
    shallowEqual
  );

  // 弹窗是否显示的变量:isModalVisible
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [form] = Form.useForm();

  // 在redux中进行网络请求，获取商品分类列表
  useEffect(() => {
    dispatch(getCategoryListAction());
  }, [dispatch]);

  // 弹窗显示
  const showModal = (key: any) => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (modalTitle === "修改分类") {
      console.log("你要修改");
    } else {
      console.log("你要添加");
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  // table columns数据
  const columns: ColumnsType = [
    {
      key: "name",
      title: "分类名",
      dataIndex: "name",
    },
    {
      key: "operation",
      title: "操作",
      dataIndex: "name",
      render: (name) => {
        return (
          <>
            <Button
              type="link"
              onClick={(e) => {
                setModalTitle("修改分类");
                showModal(name);
              }}
            >
              修改分类
            </Button>
          </>
        );
      },
      width: "15%",
      align: "center",
    },
  ];

  // table 数据
  const data: any[] = categoryList;

  return (
    <>
      <Card
        extra={
          <Button
            type="primary"
            onClick={(e) => {
              setModalTitle("添加分类");
              showModal(e);
            }}
          >
            <PlusOutlined />
            添加
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={data}
          bordered
          rowKey="_id"
          pagination={{ pageSize: PAGE_SIZE }}
          scroll={{ y: "calc(100vh - 557px)" }}
        />
      </Card>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form}>
          <Form.Item
            name="operation"
            rules={[
              {
                required: true,
                message: "分类名称必须输入",
              },
            ]}
          >
            <Input placeholder="分类名必须输入" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryPage;
