// // 全局自定义组件的注册
// import PageTools from './PageTools'
// import UploadExcel from './UploadExcel/index.vue'
// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//     Vue.component('UploadExcel', UploadExcel)
//   }
// }
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import LangSelect from './lang'
import TagsView from './TagsView'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册导入excel组件
    Vue.component('ScreenFull', ScreenFull) // 注册导入excel组件
    Vue.component('ThemePicker', ThemePicker) // 注册导入excel组件
    Vue.component('LangSelect', LangSelect) // 注册导入excel组件
    Vue.component('TagsView', TagsView) // 注册导入excel组件
  }
}
