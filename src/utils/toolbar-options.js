import { Quill } from 'vue-quill-editor'
// 自定义字体大小
const fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = ['12px', '13px', '14px', '15px', '16px', '18px', '20px', '24px', '36px', '42px']
Quill.register(fontSizeStyle, true)

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': fontSizeStyle.whitelist }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image'],
  // ['link', 'image', 'video'],
  ['clean']
]
export default toolbarOptions
