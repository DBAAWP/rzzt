<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <TreeTools :tree-node="company" :is-root="false" @addDepts="addDepts" />
        <!-- 树形控件 -->
        <!-- 传入内容, 插槽内容 会多次循环, 有多少节点就会循环多少次 -->
        <!-- 作用域插槽 slot-scope="data" 接收传递给插槽的数据, data是每个节点的数据对象 -->
        <el-tree :data="departs" :props="defaultProps">
          <TreeTools slot-scope="{data}" :tree-node="data" @addDepts="addDepts" @delDepts="getDepartments" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <AddDept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>

import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    TreeTools, AddDept
  },
  data() {
    return {
      company: {}, // 头部负责人
      departs: [], // 树形结构内容
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false, // 默认不显示弹窗
      node: null // 记录当前点击的node节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const resluts = await getDepartments()
      console.log(resluts)
      this.company = { name: resluts.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(resluts.depts, '') // 调用递归方法,转化树形结构
    },
    // 监听tree-tools 中触发点击添加子部门的时间
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    // 编辑部门
    editDepts(node) {
      // 显示弹窗
      this.showDialog = true
      // 记录点击的部门节点
      this.node = node
      // 通过refs获取到子组件的实例, 调用子组件的方法
      this.$refs.addDept.getDepartDetail(this.node.id)
    }
  }

}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
