<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 左侧内容 -->
            <el-row style="height:60px">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog = true">新增角色</el-button>
            </el-row>
            <el-table border="" :data="list">
              <el-table-column align="center" type="index" label="序号" width="120" />
              <el-table-column align="center" prop="name" label="名称" width="240" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="{row}">

                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <el-pagination
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
            <!-- 右侧内容 -->
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :closable="false"
              :show-icon="true"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" disabled style="width:400px" type="textarea" rows="3" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog title="编辑部门" :visible="showDialog" width="35%" @close="btnCancle">
      <el-form ref="roleRorm" label-width="90px" :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancle">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, deleteRole, getCompanyInfo, getRoleDetail, getRoleList, updateRole } from '@/api/setting.js'
import store from '@/store'
export default {
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      const { rows } = await getRoleList()
      const isRepeat = rows.filter(item => item.name === value)
      if (this.roleForm.id) {
        callback()
      } else {
        isRepeat ? callback(new Error('角色名称不能相同')) : callback()
      }
    }

    return {
      list: [],
      formData: {}, // 公司信息
      showDialog: false, // 控制编辑部门弹窗
      page: {
        page: 1, // 当前页码
        pagesize: 3, // 每页条数
        total: 0 // 记录总数
      },
      roleForm: {
        description: '',
        name: ''
      },
      rules: {
        name: [{ required: true, message: '角色名名称不能为空', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo() // 公司信息
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      // newPage是当前点击的页码
      this.page.page = newPage
      this.getRoleList()
    },
    // 获取企业信息
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(store.getters.companyId)
    },
    // 删除角色
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除?')
        await deleteRole(id) // 调用删除
        this.getRoleList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑部门
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true // 显示弹层
    },
    // 点击取消
    btnCancle() {
      this.roleForm = {
        description: '',
        name: ''
      }
      this.showDialog = false
      this.$refs.roleRorm.resetFields()
    },
    // 点击确定
    async  btnOK() {
      try {
        await this.$refs.roleRorm.validate()
        if (this.roleForm.id) {
          // 编辑角色
          await updateRole(this.roleForm)
          this.$message.success('修改成功')
        } else {
          // 新增角色
          await addRole(this.roleForm)
          this.$message.success('新增成功')
        }
        this.getRoleList() // 重新拉取数据
        this.showDialog = false // 关闭弹窗
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style>

</style>
