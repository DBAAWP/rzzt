<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <TreeTools :tree-node="company" :is-root="false" />
        <!-- 树形控件 -->
        <!-- 传入内容, 插槽内容 会多次循环, 有多少节点就会循环多少次 -->
        <!-- 作用域插槽 slot-scope="data" 接收传递给插槽的数据, data是每个节点的数据对象 -->
        <el-tree :data="departs" :props="defaultProps">
          <TreeTools slot-scope="{data}" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>

import TreeTools from './components/tree-tools.vue'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: { name: '成功动物园管理有限公司', manager: '负责人' },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
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
