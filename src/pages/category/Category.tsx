import React, { useEffect } from "react";
import { useDispatch, shallowEqual } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { Button, Card, Table } from "antd";
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

  // 在redux中进行网络请求
  useEffect(() => {
    dispatch(getCategoryListAction());
  }, [dispatch]);

  const columns: ColumnsType = [
    {
      key: "name",
      title: "分类名",
      dataIndex: "name",
    },
    {
      key: "operating",
      title: "操作",
      dataIndex: "key",
      render: (key) => {
        return (
          <Button type="link" onClick={() => console.log(key)}>
            修改分类
          </Button>
        );
      },
      width: "15%",
      align: "center",
    },
  ];

  const data: any[] = categoryList;

  return (
    <Card
      extra={
        <Button type="primary">
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
      />
    </Card>
  );
};

export default CategoryPage;
