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
          <el-button type="success" size="small" @click="$router.push('/import')">excle导入</el-button>
          <el-button type="danger" size="small" @click="exportData">excle导出</el-button>
          <el-button type="primary" size="small" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 表格组件 -->
      <el-table v-loading="loading" :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="头像" align="center">
          <template slot-scope="{row}">
            <img
              slot="reference"
              v-imagerror="require('@/assets/common/bigUserHeader.png')"
              :src="row.staffPhoto "
              style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
              alt=""
              @click="showQrCode(row.staffPhoto)"
            >
          </template>
        </el-table-column>
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatEmployment" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template v-slot="{row}">{{ row.timeOfEntry | formatDate }}</template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template v-slot="{row}">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template v-slot="{row}">
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
            <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
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
    <!-- 组件弹层 -->
    <!-- sync 修饰符 是组件去改变父组件的数据的语法糖 -->
    <addEmployee :show-dialog.sync="showDialog" />
    <el-dialog title="二维码" :visible.sync="showCodeDidlog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <AssignRole ref="assignRole" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
  </div>
</template>

<script>
import { delEmployee, getEmployeeList } from '@/api/employees.js'
import EmployeeEnum from '@/api/constant/employees.js'
import addEmployee from '@/views/employees/components/add-employee'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue'
export default {
  components: {
    addEmployee, AssignRole
  },
  data() {
    return {
      list: [],
      page: {
        page: 1, // 当前页码,
        size: 10, // 每页条数
        total: 0 // 总数
      },
      loading: false, // 显示遮罩层
      showDialog: false,
      showCodeDidlog: false,
      showRoleDialog: false,
      userId: null
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
    },
    // 聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async delEmployee(id) {
      try {
        await this.$confirm('确认删除?')
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    // 导出员工
    exportData() {
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows)
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    formatJson(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          return item[headers[key]]
        })
      })
    },
    showQrCode(url) {
      if (url) {
        this.showCodeDidlog = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('还未上传头像')
      }
    },
    async editRole(id) {
      this.userId = id
      await this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style>
</style>
