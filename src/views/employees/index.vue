<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <!-- 左侧内容 -->
        <template #before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <!-- 右侧内容 -->
        <template #after>
          <el-button type="success" size="small">excle导入</el-button>
          <el-button type="danger" size="small">excle导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 表格组件 -->
      <el-table v-loading="loading" :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
        <el-table-column label="账户状态" sortable="" prop="enableState" />
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center">
        <el-pagination
          layout="prev, pager, next"
          :page-size="page.size"
          :current-page="page.page"
          :total="page.total"
          @current-change="changePage"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees.js'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1, // 当前页码,
        size: 10, // 每页条数
        total: 0 // 总数
      },
      loading: false // 显示遮罩层
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(newPage) {
      // newPage是最新的页码
      this.page.page = newPage
      // 重新获取数据
      this.getEmployeeList()
    }
  }
}
</script>

<style>
</style>
