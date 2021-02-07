import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../redux/hooks";
import { useParams, useHistory } from "react-router-dom";
import { Card, Button, Form, Input, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import PicturesWall from "../../../components/picture-wall/PictureWall";

import {
  cancelResetRendAction,
  getCategoryListAction,
} from "../../../redux/product/actions";

const { Option } = Select;
interface RouteParams {
  id: string;
}

const AddUpdatePage: React.FC = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.product.categoryList);

  const history = useHistory();
  const match = useParams<RouteParams>();
  console.log(match.id);

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
  };

  const onFinishFailed = (errorInfo: any) => {
    if (errorInfo) return;
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

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
      <Form
        {...layout}
        className="basic"
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
      >
        <Form.Item
          label="商品名称："
          name="name"
          rules={[{ required: true, message: "请输入商品名称" }]}
        >
          <Input placeholder="商品名称" />
        </Form.Item>

        <Form.Item
          label="商品描述："
          name="desc"
          rules={[{ required: true, message: "请输入商品描述" }]}
        >
          <Input placeholder="商品描述" />
        </Form.Item>
        <Form.Item
          label="商品价格："
          name="price"
          rules={[{ required: true, message: "请输入商品价格" }]}
        >
          <Input placeholder="商品价格" prefix="￥" suffix="元" type="number" />
        </Form.Item>
        <Form.Item
          label="商品分类："
          name="categoryId"
          rules={[{ required: true, message: "请输入商品分类" }]}
          initialValue=""
        >
          <Select style={{ width: 120 }} onChange={handleChange}>
            <Option value="">请选择分类</Option>
            {categoryList.map((item: any) => (
              <Option value={item._id} key={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="商品图片："
          name="imgs"
          rules={[{ required: true, message: "请输入商品图片" }]}
        >
          <PicturesWall />
        </Form.Item>
        {/* <Form.Item
          label="商品详情："
          name="detail"
          rules={[{ required: true, message: "请输入商品详情" }]}
        >
          此处为富文本编辑器
        </Form.Item> */}
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </Card>
  );
};

export default AddUpdatePage;
