/**
 * github上面的react-draft-wysiwyg富文本编辑器
 */
import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./RichTextEditor.scss";

class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
  };

  // 富文本编辑器输入的内容
  getRichText = () => {
    const { editorState } = this.state;
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  setRichText(html: any) {
    // const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper" // 外部容器样式
          editorClassName="editor" // 编辑区样式
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}

export default RichTextEditor;
