import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  updateSearchListAction,
} from "../../redux/product/actions";

const { Option } = Select;

const ProductPage: React.FC = () => {
  // router hook
  const history = useHistory();
  // redux hooks
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state.product.isLoading,
    shallowEqual
  );
  const isRest = useSelector((state) => state.product.isRest, shallowEqual);
  const keyWord = useSelector((state) => state.product.keyWord, shallowEqual);
  const isSearch = useSelector((state) => state.product.isSearch, shallowEqual);
  const isUpdateProduct = useSelector(
    (state) => state.product.isUpdateProduct,
    shallowEqual
  );
  const searchType = useSelector(
    (state) => state.product.searchType,
    shallowEqual
  );
  const productList = useSelector(
    (state) => state.product.productList,
    shallowEqual
  );
  const { list, total, pageNum, pageSize } = productList;
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
      // dataIndex: "operation",
      key: "operation",
      render: (item) => {
        const { _id } = item;
        return (
          <div className="product-operation">
            <Button
              type="link"
              onClick={(e) =>
                history.push({
                  pathname: `/prod/product/detail/${_id}`,
                  state: item,
                })
              }
            >
              详情
            </Button>
            <Button
              type="link"
              onClick={(e) =>
                history.push({
                  pathname: `/prod/product/addUpdate/${_id}`,
                  state: item,
                })
              }
            >
              修改
            </Button>
          </div>
        );
      },
      align: "center",
      width: "10%",
    },
  ];

  useEffect(() => {
    if(isRest){
      if (list.length === 0) {
        dispatch(getProductAction({ pageNum: 1, pageSize: PAGE_SIZE }));
      } else if (isUpdateProduct) {
        dispatch(getProductAction({ pageNum: pageNum, pageSize: PAGE_SIZE }));
      }
    }
    
  }, [dispatch, isRest, list.length, isUpdateProduct, pageNum]);

  return (
    <Card
      title={
        <div>
          <Select
            defaultValue="productName"
            style={{ width: 120 }}
            onChange={(value, option) => {
              dispatch(updateSearchTypeAction(value));
            }}
          >
            <Option value="productName">按名称搜索</Option>
            <Option value="productDesc">按描述搜索</Option>
          </Select>
          <Input
            placeholder="关键字"
            className="product-input"
            value={keyWord}
            onChange={(e) => dispatch(updateSearchValueAction(e.target.value))}
          />
          <Button
            type="primary"
            onClick={(e) => {
              dispatch(
                updateSearchListAction({
                  searchType,
                  keyWord,
                  pageNum: 1,
                  pageSize,
                })
              );
            }}
          >
            搜索
          </Button>
        </div>
      }
      extra={
        <Button
          type="primary"
          onClick={(e) => history.push("/prod/product/addUpdate")}
        >
          <PlusOutlined />
          添加商品
        </Button>
      }
    >
      <Table
        rowKey="_id"
        loading={isLoading}
        pagination={{
          total: total,
          pageSize: PAGE_SIZE,
          current: pageNum,
          onChange: (page, pageSize) => {
            if (isSearch) {
              dispatch(
                updateSearchListAction({
                  searchType,
                  keyWord,
                  pageNum: page,
                  pageSize: pageSize as number,
                })
              );
            } else {
              dispatch(
                getProductAction({
                  pageNum: page,
                  pageSize: pageSize as number,
                })
              );
            }
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
