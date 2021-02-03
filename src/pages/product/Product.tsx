import React, { useEffect } from "react";
import { useDispatch, shallowEqual } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { Card, Button, Select, Input, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import "./Product.scss";
import { PAGE_SIZE } from "../../config";
import {
  getProductAction,
  updateStatusAction,
  updateSearchTypeAction,
  updateSearchValueAction,
} from "../../redux/product/actions";

const { Option } = Select;

const ProductPage: React.FC = () => {
  // redux hooks
  const dispatch = useDispatch();
  const keyWord = useSelector((state) => state.product.keyWord);
  const productList = useSelector((state) => state.product.productList);
  const { list, total } = productList;
  const dataSource = list;

  const columns: ColumnsType<any> = [
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "商品描述",
      dataIndex: "desc",
      key: "desc",
      width: "50%",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: (price) => "￥" + price,
      align: "center",
    },
    {
      title: "状态",
      key: "status",
      render: (item) => {
        const { status } = item;
        return (
          <div className="product-status">
            <div>{status === 1 ? "在售" : "已停售"}</div>
            <Button
              type="link"
              danger={status === 1 ? true : false}
              onClick={() => {
                dispatch(
                  updateStatusAction({
                    productId: item._id,
                    status: status === 1 ? 2 : 1,
                  })
                );
              }}
            >
              {status === 1 ? "下架" : "上架"}
            </Button>
          </div>
        );
      },
      align: "center",
      width: "10%",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: () => {
        return (
          <div className="product-operation">
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
          </div>
        );
      },
      align: "center",
      width: "10%",
    },
  ];

  useEffect(() => {
    dispatch(getProductAction({ pageNum: 1, pageSize: PAGE_SIZE }));
  }, [dispatch]);

  return (
    <Card
      title={
        <div>
          <Select
            defaultValue="name"
            style={{ width: 120 }}
            onChange={(value) => {
              dispatch(updateSearchTypeAction(value));
            }}
          >
            <Option value="name">按名称搜索</Option>
            <Option value="desc">按描述搜索</Option>
          </Select>
          <Input
            placeholder="关键字"
            className="product-input"
            value={keyWord}
            onChange={(e) => dispatch(updateSearchValueAction(e.target.value))}
          />
          <Button type="primary">搜索</Button>
        </div>
      }
      extra={
        <Button type="primary">
          <PlusOutlined />
          添加商品
        </Button>
      }
    >
      <Table
        rowKey="_id"
        pagination={{
          total: total,
          pageSize: PAGE_SIZE,
          onChange: (page, pageSize) => {
            dispatch(
              getProductAction({ pageNum: page, pageSize: pageSize as number })
            );
          },
        }}
        bordered
        columns={columns}
        dataSource={dataSource}
      />
    </Card>
  );
};

export default ProductPage;
