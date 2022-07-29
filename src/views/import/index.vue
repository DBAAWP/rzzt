<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  name: 'ImportPage',
  components: {},
  props: {
  },
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {
    async onSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const data = []
      results.forEach(item => {
        const newItem = {}
        for (const key in item) {
          const newKey = userRelations[key]
          newItem[newKey] = item[key]
        }
        data.push(newItem)
      })
      // 发请求
      await importEmployee(data)
      this.$message({
        message: '操作成功',
        type: 'success',
        showClose: true,
        duration: 3000
      })
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
