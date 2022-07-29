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
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册导入excel组件
  }
}
