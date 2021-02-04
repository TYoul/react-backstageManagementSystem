import React, { useState, useEffect } from "react";
import { useDispatch, shallowEqual } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { Button, Card, Table, Modal, Form, Input, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";

import { PAGE_SIZE } from "../../config";

import {
  getCategoryListAction,
  addCategoryAction,
  updateCategoryAction,
  changeModalAction,
} from "../../redux/category/actions";

const CategoryPage: React.FC = () => {
  // redux hook
  const dispatch = useDispatch();
  const categoryList = useSelector(
    (state) => state.category.categoryList,
    shallowEqual
  );
  const isModalVisible = useSelector(
    (state) => state.category.isModalVisible,
    shallowEqual
  );
  const isLoading = useSelector(
    (state) => state.category.isLoading,
    shallowEqual
  );

  // 弹窗的标题
  const [modalTitle, setModalTitle] = useState("");
  // 弹窗input值，只在修改分类的弹窗里面有
  const [modalCurrentOperation, setModalCurrentOperation] = useState({
    name: "",
    _id: "",
  });
  const [form] = Form.useForm();

  // 在redux中进行网络请求，获取商品分类列表
  useEffect(() => {
    dispatch(getCategoryListAction());
  }, [dispatch]);

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
      // dataIndex: "key",
      render: (item) => {
        return (
          <>
            <Button
              type="link"
              onClick={(e) => {
                setModalTitle("修改分类");
                showModal(item);
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

  // 弹窗显示
  const showModal = (item?: any) => {
    if (item) {
      const { name } = item;
      setModalCurrentOperation(item);
      // TODO:当选择修改分类时，用antd的setFieldsValue设置input的默认值
      form.setFieldsValue({
        operation: name,
      });
    }
    dispatch(changeModalAction(true));
  };

  // 弹窗确定
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (modalTitle === "修改分类") {
        const { _id } = modalCurrentOperation;
        const { operation } = values;
        dispatch(
          updateCategoryAction({ categoryId: _id, categoryName: operation })
        );
      } else {
        dispatch(addCategoryAction(values.operation));
        form.resetFields();
      }
    } catch (error) {
      message.warning("表单输入有误，请检查", 1);
      return;
    }
  };

  // 弹窗取消
  const handleCancel = () => {
    form.resetFields();
    dispatch(changeModalAction(false));
  };

  return (
    <>
      <Card
        extra={
          <Button
            type="primary"
            onClick={(e) => {
              setModalTitle("添加分类");
              showModal();
            }}
          >
            <PlusOutlined />
            添加分类
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={data}
          bordered
          rowKey="_id"
          pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
          loading={isLoading}
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
            <Input placeholder="请输入分类名称" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryPage;
