<template>
  <div class="bookings">
    <div class="list">
      <h3>Current Bookings</h3>
      <div class="search">
        <el-input placeholder="search by ID / Component /Student" v-model="searchTxt"></el-input>
        <el-button type="primary" @click="handleSearch">Search</el-button>
        <el-button type="success" @click="handleNewBooking">Add New Booking</el-button>
        <el-button type="warning" @click="handleMailAll">Mail all</el-button>
      </div>
      <el-table class="bookings-table" border :data="tableData" :header-cell-style="headerCellStyle">
        <el-table-column label="Full Name" prop="fullName"></el-table-column>
        <el-table-column label="School" prop="school" width="80"></el-table-column>
        <el-table-column label="Component Name/Cupboard" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="component" @click="handleEditComponent(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="UniqueID" prop="uniqueID" width="100"></el-table-column>
        <el-table-column label="Project Info/Locker Number" prop="info" width="100"></el-table-column>
        <el-table-column label="Due Date" prop="dueDate" width="100"></el-table-column>
        <el-table-column label="Mark as Returned" width="140">
          <template slot-scope="scope">
            <div class="return">
              <el-button @click="handleReturnedClick(scope.row)" type="primary" size="small">Returned</el-button>
              <el-button @click="handleNotReturnedClick(scope.row)" type="danger" size="small">Not Returned</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Extend booking" width="210">
          <template slot-scope="scope">
            <span>Extend by:</span>
            <el-input></el-input>
            <el-button style="margin-top: 8px" @click="handleExtendClick(scope.row)" type="primary" size="small">
              Extend
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="Mail" width="80">
          <template slot-scope="scope">
            <el-button @click="handleMailClick(scope.row)" type="warning" size="small"> Mail</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog width="600px" center title="New Booking" :visible.sync="insertDlgVisible">
      <el-form ref="insertForm" :model="insertForm" label-width="180px" :rules="rules">
        <el-form-item label="PersonID:" prop="personId">
          <el-input :style="{width}" v-model="insertForm.personId"></el-input>
        </el-form-item>
        <el-form-item label="Component:" prop="component">
          <el-select clearable :style="{width}" v-model="insertForm.component">
            <el-option v-for="com in componentList" :key="com" :label="com" :value="com"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="UniqueID:" prop="uniqueID">
          <el-select clearable :style="{width}" v-model="insertForm.uniqueID">
            <el-option v-for="id in idList" :key="id" :label="id" :value="id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Return date:" prop="dueDate">
          <el-date-picker :style="{width}" v-model="insertForm.dueDate"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
      </span>
    </el-dialog>
    <el-dialog width="600px" center title="Mail" :visible.sync="mailDlgVisible">
      <div class="mail-content">
        <section class="note" v-if="isMailAll">
          <h3>Mail all students with items</h3>
          If you would like to e-mail all the students who are late or have items out,type in your e-mail text below and
          click 'Send'.
        </section>
        <div class="mail-all" v-if="isMailAll">
          <span class="pre-txt">Mail all students with</span>
          <el-radio-group v-model="mailItem">
            <el-radio label="late items">late items</el-radio>
            <el-radio label="items out">items out</el-radio>
          </el-radio-group>
        </div>
        <div class="mail-name" v-else>
          Mail to "<span>{{ mailName }}</span>"
        </div>
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4 }"></el-input>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="handleSendMail">Send</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import table from '@/mixins/table'

export default {
  name: 'current-bookings',
  data() {
    return {
      searchTxt: '',
      oriTableData: [
        {
          fullName: 'Harsha Madnani',
          school: 'CS',
          name: 'Inter Edison for Arduino',
          uniqueID: 'D4148',
          dueDate: '2016-09-01',
          info: ''
        },
        {
          fullName: 'uqdhjjk sdijojdw',
          school: 'CS',
          name: 'Inter Edison for Arduino astr',
          uniqueID: 'D4149',
          dueDate: '2016-09-01',
          info: ''
        },
        {
          fullName: 'Huqwsak nsjadqw',
          school: 'CS',
          name: 'Inter Edison for Arduino  teee',
          uniqueID: 'D4223',
          dueDate: '2016-09-01',
          info: ''
        },
        {
          fullName: 'Ytsds wosk sda',
          school: 'CS',
          name: 'Inter Edison for Arduino123',
          uniqueID: 'D4522',
          dueDate: '2016-09-01',
          info: ''
        }
      ],
      tableData: [],
      insertDlgVisible: false,
      insertForm: { personId: '', component: '', uniqueID: '', dueDate: '' },
      width: '300px',
      idList: [],
      componentList: [],
      rules: {
        personId: { required: true, message: 'This field should be a 7 or 8 digit number', trigger: 'blur' },
        component: { required: true, message: 'A component should be selected', trigger: 'change' },
        uniqueID: { required: true, message: 'An identifier should be selected', trigger: 'change' },
        dueDate: { required: true, message: 'A date should be selected', trigger: 'blur' }
      },
      mailDlgVisible: false,
      isMailAll: false,
      mailItem: 'late items',
      mailName: ''
    }
  },
  mixins: [table],
  mounted() {
    this.tableData = JSON.parse(JSON.stringify(this.oriTableData))
    this.idList = this.oriTableData.map(m => m.uniqueID)
    this.componentList = this.oriTableData.map(m => m.name)
  },
  methods: {
    handleNewBooking() {
      this.insertDlgVisible = true
    },
    handleSearch() {
      const tableData = JSON.parse(JSON.stringify(this.oriTableData))
      const txt = this.searchTxt.trim()
      this.tableData = tableData.filter(v => v.fullName.includes(txt) || v.uniqueID.includes(txt) || v.name.includes(txt))
    },
    handleEditComponent() {
    },
    handleExtendClick() {
    },
    handleReturnedClick() {
    },
    handleNotReturnedClick() {
    },
    handleMailClick({ fullName }) {
      this.mailName = fullName
      this.isMailAll = false
      this.mailDlgVisible = true
    },
    handleMailAll() {
      this.isMailAll = true
      this.mailDlgVisible = true
    },
    handleSendMail() {
      this.mailDlgVisible = false
    },
    handleSubmit() {
      this.$refs['insertForm'].validate((valid) => {
        if (valid) {
          this.insertDlgVisible = false
          this.$refs['insertForm'].resetFields()
          this.$message.success('Add Success')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bookings {
  height: 100%;
  width: 1200px;

  .list {
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #F3F3F3;
    overflow: auto;

    .search {
      display: flex;
      margin-bottom: 20px;

      .el-button {
        margin-left: 20px;
      }
    }

    .bookings-table {

      .return {
        :deep {
          .el-button {
            width: 90px;
          }

          .el-button + .el-button {
            margin-top: 10px;
            margin-left: 0;
          }
        }
      }

    }
  }

  .tip {
    color: red;
    font-size: 12px;
  }

  .mail-content {

    .note {
      padding: 0 10px 10px;
      border: #ccc 1px solid;
      border-radius: 5px;
    }

    .mail-all {
      margin: 10px 0;

      .pre-txt {
        margin-right: 10px;
      }
    }

    .mail-name {
      margin: 10px 0;
    }


  }
}
</style>