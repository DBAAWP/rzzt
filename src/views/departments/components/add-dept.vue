<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" :model="formData" label-width="120px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartDetail, getDepartments, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: 'AddDept',
  components: {},
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 检测部门名称是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat
      if (this.formData.id) {
        // 编辑部门
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 新增部门
      // 找所有同级部门下有没有和value名字相同的部门 filter找出子部门  some找出名字是否相同
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 如果isRepeat为true 表示找到一样的名字
      isRepeat ? callback(new Error('同级部门不能有相同名字的部门')) : callback()
    }
    // 检查有所的部门编码是否一样
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        isRepeat = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        isRepeat = depts.some(item => item.code === value && value)
      }
      isRepeat ? callback(new Error('所有部门编码不能相同')) : callback()
    }
    return {
      peoples: [], // 负责人列表
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称为1-50个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码为1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍为1-300个字符', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 获取负责人列表
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 通过父组件的调用,传入需要的id,把返回的数据赋值给formData
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    },
    btnOK() {
      // 手动校验表单
      this.$refs.deptForm.validate(async isOK => {
        if (this.formData.id) {
          // 编辑部门
          await updateDepartments(this.formData)
        } else {
          // 新增部门
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
        }
        this.$emit('addDepts')
        this.$emit('update:showDialog', false)
      })
    },
    btnCancel() {
      // 点击取消 关闭 重置表单
      this.$emit('update:showDialog', false)
      this.$refs.deptForm.resetFields()
      // 因为点击编辑部门后,formData中存有当前部门的ID,然后点击新增的时候标题不会变
      // resetFields 不能重置非表单里面的数据
      // 所以要手动清除部门的ID
      this.formData.id = ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
