<template>
  <div class="y-view-main">
    <div class="title">基础表格</div>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="formInline.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
    <div class="main-table">
      <el-table
        :data="tableData"
        height="calc(100vh - 300px)"
        border
        style="width: 100%"
      >
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick"
            >Detail</el-button
            >
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap">
      <el-pagination
        v-model:currentPage="pagination.page"
        v-model:page-size="pagination.size"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup name="baseTable">
import { reactive, onActivated } from 'vue'

defineOptions({
  name: 'baseTable'
})

const pagination = reactive({
  page: 1,
  size: 10,
  total: 400
})
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
const formInline = reactive({
  user: '',
  region: '',
})

const handleClick = () => {
  console.log('click')
}
const onSubmit = () => {
  console.log('submit!')
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pagination.size = val
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  pagination.page = val
}

onActivated(() => {
  console.log('onActivated-baseTable')
})
</script>

<style lang="scss" scoped>
.y-view-main {
  padding: 16px;
  background: #fff;
  border-radius: 5px;
}

.title {
  font-size: 18px;
  color: #777;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 8px;
  margin-bottom: 8px;
}
.pagination-wrap{
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>
