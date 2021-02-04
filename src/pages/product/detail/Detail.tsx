import React from "react";
import { useDispatch } from "react-redux";
import "./Detail.scss";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Card, Button, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { cancelResetRendAction } from "../../../redux/product/actions";

interface params {
  id: string;
}

interface localtion {
  state: {
    name: string;
    desc: string;
    price: string;
    imgs: string[];
    detail: string;
  };
}

// 详情或者修改页面
const DetailPage: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<params>();
  const history = useHistory();
  const localtion: localtion = useLocation();
  const { name, desc, price, imgs, detail } = localtion.state;

  return (
    <Card
      title={
        <>
          <Button
            type="link"
            className="detail-button"
            onClick={(e) => {
              dispatch(cancelResetRendAction(false));
              history.goBack();
            }}
          >
            <ArrowLeftOutlined />
          </Button>
          商品详情
        </>
      }
    >
      <List>
        <List.Item className="product-list">
          <span className="product-name">商品名称：</span>
          <span>{name}</span>
        </List.Item>
        <List.Item className="product-list">
          <span className="product-name">商品描述：</span>
          <span>{desc}</span>
        </List.Item>
        <List.Item className="product-list">
          <span className="product-name">商品价格：</span>
          <span>{price}</span>
        </List.Item>
        <List.Item className="product-list">
          <span className="product-name">商品图片：</span>
          <span>{imgs[0]}</span>
        </List.Item>
        <List.Item className="product-list">
          <span className="product-name">商品详情：</span>
          <span>{detail}</span>
        </List.Item>
      </List>
    </Card>
  );
};

export default DetailPage;
