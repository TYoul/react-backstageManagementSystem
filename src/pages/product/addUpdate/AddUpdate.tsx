import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../redux/hooks";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Card, Button, Form, Input, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { addProduct, updateProduct } from "../../../services/product";
import PicturesWall from "../../../components/picture-wall/PictureWall";
import RichTextEditor from "../../../components/rich-text-editor/RichTextEditor";

import {
  cancelResetRendAction,
  getCategoryListAction,
  updateProductAction,
} from "../../../redux/product/actions";

const { Option } = Select;
interface RouteParams {
  id: string;
}

interface localtion {
  state: {
    _id: string;
    name: string;
    desc: string;
    price: string;
    imgs: string[];
    detail: string;
  };
}

const AddUpdatePage: React.FC = () => {
  const dispatch = useDispatch();
  const pictureWall = useRef<any>();
  const richTextEditor = useRef<any>();
  const categoryList = useSelector((state) => state.product.categoryList);

  const history = useHistory();
  const localtion: localtion = useLocation();
  const match = useParams<RouteParams>();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCategoryListAction());
    if (match.id) {
      form.setFieldsValue(localtion.state);
      pictureWall.current.setImg(localtion.state.imgs);
      richTextEditor.current.setRichText(localtion.state.detail);
      console.log(localtion.state);
    }
  }, [dispatch]);

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
  };

  const onFinishFailed = (errorInfo: any) => {
    if (errorInfo) return;
  };


// form表单提交
  const onFinish = async (values: any) => {
    // 从pictureWall组件中获取到已经上传的图片数组
    const imgs = pictureWall.current.getImg();
    const detail = richTextEditor.current.getRichText();
    let result: any;
    // 判断是否有id，有id的化是修改商品，没有的化是添加商品
    match.id
      ? (result = await updateProduct({
          ...values,
          _id: match.id,
          imgs,
          detail,
        }))
      : await addProduct({ ...values, imgs, detail });
    const { status, msg } = result;
    if (status === 0) {
      message.success("添加商品成功");
      dispatch(updateProductAction(true));
      history.replace("/prod/product");
    } else message.error(msg, 1);
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
              dispatch(updateProductAction(false));
              dispatch(cancelResetRendAction(false));
              history.goBack();
            }}
          >
            <ArrowLeftOutlined />
          </Button>
          商品{match.id ? "修改" : "详情"}
        </>
      }
    >
      <Form
        form={form}
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
          <Input placeholder="商品名称" style={{ width: "20%" }} />
        </Form.Item>

        <Form.Item
          label="商品描述："
          name="desc"
          rules={[{ required: true, message: "请输入商品描述" }]}
        >
          <Input placeholder="商品描述" style={{ width: "20%" }} />
        </Form.Item>
        <Form.Item
          label="商品价格："
          name="price"
          rules={[{ required: true, message: "请输入商品价格" }]}
        >
          <Input
            placeholder="商品价格"
            prefix="￥"
            suffix="元"
            type="number"
            style={{ width: "20%" }}
          />
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
        <Form.Item label="商品图片：" name="imgs">
          <PicturesWall ref={pictureWall} />
        </Form.Item>
        <Form.Item label="商品详情：" name="detail" wrapperCol={{ md: 8 }}>
          <RichTextEditor ref={richTextEditor} />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginLeft: "50px" }}>
          提交
        </Button>
      </Form>
    </Card>
  );
};

export default AddUpdatePage;
