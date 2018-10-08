import React, { Component } from 'react'
import './App.css'
import marked from 'marked'

const defaultInputText = 
`# React Markdown Previewer :)

## 這是個副標題...
  
內聯程式碼\`<div></div>\`內聯程式碼

\`\`\`
// 多行程式碼:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`  

**粗粗的!**

_斜斜的~_.

**_又粗又斜~!_**

~~刪除線~~.

超連結[links](https://www.freecodecamp.com)

> 塊引用

1. 我是排序列表
1. :D
1. :P

![React Logo w/ Text](https://goo.gl/Umyytc)
`

// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
const renderer = new marked.Renderer()
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>'
}

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({ breaks: true })


function Editor(props) {
  return (
    <textarea id="editor"
      value={props.userInputText} 
      onChange={props.onTextInput}/>
  )
}

function Preview(props) {
  return (
    <div id="preview" dangerouslySetInnerHTML={
      {__html: marked(props.userInputText, { renderer: renderer })}}/>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInputText: defaultInputText,
    }
    this.handleTextInput = this.handleTextInput.bind(this)
  }

  handleTextInput(e) {
    this.setState({
      userInputText: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <Editor 
          userInputText={this.state.userInputText} 
          onTextInput={this.handleTextInput}/>
        <Preview userInputText={this.state.userInputText} />
      </div>
    )
  }
}

export default App
