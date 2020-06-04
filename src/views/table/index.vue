<template>
  <div class="app-container">
    <!-- 搜索start -->
    <Search is-operate="true" @search="doQuery" @clear="clearQuery">
      <search-item>
        <template slot="label">
          设备ID
        </template>
        <template slot="content">
          <el-input v-model.trim="query.deviceID" placeholder="请输入设备ID" clearable />
        </template>
      </search-item>
      <search-item>
        <template slot="label">
          厂商
        </template>
        <template slot="content">
          <el-select v-model="query.vendorId" placeholder="请选择">
            <el-option
              v-for="item in vendorList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </template>
      </search-item>
      <search-item>
        <template slot="label">
          车牌号
        </template>
        <template slot="content">
          <el-input v-model.trim="query.plateNo" placeholder="请输入车牌号" clearable />
        </template>
      </search-item>
      <search-item>
        <template slot="label">
          入库时间
        </template>
        <template slot="content">
          <el-date-picker
            v-model="query.storeTime"
            class="picker"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </template>
      </search-item>
      <template slot="footer">
        <el-button type="primary" size="medium" @click="addDevice">
          添加设备
        </el-button>
        <div class="pull-right">
          <el-button type="text" icon="el-icon-download" @click="handleDownload(scope)">
            <i class="icon icon-xiazai" />按搜索结果下载到本地
          </el-button>
        </div>
      </template>
    </Search>
    <!-- 搜索end -->

    <el-table
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页start -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="pagination.page"
      :limit.sync="pagination.limit"
      @pagination="fetchData"
    />
    <!-- 分页end -->
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      vendorList: [
        {
          value: '某宝',
          key: 1
        },
        {
          value: '某东',
          key: 2
        }
      ],
      query: {
        deviceID: '',
        vendorId: '',
        plateNo: '',
        storeTime: ''
      },
      total: 0,
      pagination: {
        page: 1,
        limit: 20
      },
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    doQuery() {
      console.log('query')
    },
    clearQuery() {
      Object.keys(this.query).map(key => {
        this.query[key] = ''
      })
    },
    addDevice() {
      console.log('do something')
    },
    handleDownload() {
      console.log('do load request')
    }
  }
}
</script>
