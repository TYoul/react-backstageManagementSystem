/**
 * 该组件是拿的antd 4.12.2的Upload的照片墙，并修改了一些部分
 */
import React from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../services/config";
import { deleteImg } from "../../services/addUpdate";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false, // 是否展示预览窗
    previewImage: "", // 要预览的图片url地址或base64编码
    previewTitle: "",
    fileList: [], // 收集好的所有上传完毕的图片名
  };

  // 设置fileList
  setImg(imgArr: string[]) {
    const result = imgArr.map((item, index) => {
      return {
        uid: index,
        name: item,
        status: "done",
        url: `${BASE_URL}/upload/${item}`,
      };
    });
    this.setState({
      fileList: result,
    });
    // return result;
  }

  // 对外暴露图片的方法：将图片数组fileList暴露出去
  getImg() {
    let result: string[] = [];
    (this.state.fileList as any).forEach((item: any) => {
      result.push(item.name);
    });
    return result;
  }

  // 关闭预览窗
  handleCancel = () => this.setState({ previewVisible: false });

  // 展示预览窗
  handlePreview = async (file: any) => {
    // 如果图片没有url也没有转换过base64，那么调用如下方法把图片转成base64
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  // 图片状态发生改变的回调
  handleChange = async ({ fileList, file }: { fileList: any; file: any }) => {
    console.log(file);
    console.log(fileList);
    // 若文件上传成功
    if (file.status === "done") {
      fileList[fileList.length - 1].url = file.response.data.url;
      fileList[fileList.length - 1].name = file.response.data.name;
    }
    // 若文件删除
    if (file.status === "removed") {
      const result = await deleteImg(file.name);
      const { status } = result;
      if (status === 0) {
        message.success("图片删除成功", 1);
      } else message.error("图片删除失败", 1);
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`} // 接受图片服务器的地址
          method="POST" // 请求方式
          name="image" // 参数名称
          listType="picture-card" // 照片墙的展示方式
          fileList={fileList as any} // 图片列表，{}[]
          onPreview={this.handlePreview} // 点击预览按钮回调
          onChange={this.handleChange} // 图片状态改变的回调<图片上传中、图片删除、图片成功上传>
        >
          {/* 隐藏上传按钮 */}
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PicturesWall;
