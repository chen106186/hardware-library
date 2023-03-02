<template>
  <div class="reservation">
    <div class="sub-title">
      Please note the below reservations are listed the order they came through.
    </div>
    <div class="list">
      <h3>Awaiting Collection</h3>
      <el-table border :data="tableData" :header-cell-style="headerCellStyle">
        <el-table-column label="Full Name" prop="fullName"></el-table-column>
        <el-table-column label="School" prop="school" width="80"></el-table-column>
        <el-table-column label="Component Name / Cupboard" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="component" @click="handleEditComponent(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Due Date" prop="dueDate" width="100"></el-table-column>
        <el-table-column label="Email" prop="Email" show-overflow-tooltip></el-table-column>
        <el-table-column label="Mark as Collected" width="170">
          <template slot-scope="scope">
            <el-button @click="handleCollectedClick(scope.row)" type="primary" size="small">collected</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Item Unavailable" width="170">
          <template slot-scope="scope">
            <el-button @click="handleDeleteClick(scope.row)" type="danger" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <ComponentDialog :c-visible.sync="show" :c-data="dialogData"></ComponentDialog>
      <el-dialog class="collect-dialog" width="500px" center :title="collectTitle"
                 :visible.sync="collectedVisible">
        <el-form :model="collectedInfo" label-width="120px">
          <el-form-item label="ID">
            <el-select style="width: 260px" v-model="collectedInfo.id" placeholder="* Select ID">
              <el-option v-for="id in idList"
                         :key="id"
                         :label="id"
                         :value="id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Locker Number">
            <el-select style="width: 260px" v-model="collectedInfo.lockerNumber">
              <el-option v-for="n in lockerNumbers" :key="n" :label="n" :value="n">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Project Name">
            <el-input style="width: 260px" v-model="collectedInfo.projectName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button type="primary" @click="doCollection">collected</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import table from '@/mixins/table'
import ComponentDialog from '@/views/components/ComponentDialog.vue'

export default {
  name: 'awaiting-collection',
  components: { ComponentDialog },
  mixins: [table],
  data() {
    return {
      tableData: [],
      show: false,
      dialogData: {},
      collectedInfo: { id: '', lockerNumber: '', projectName: '' },
      collectTitle: '',
      collectedVisible: false,
      lockerNumbers: [],
      idList: []
    }
  },
  mounted() {
    for (let i = 1; i < 31; i++) {
      this.lockerNumbers.push(i)
    }
    this.tableData = [
      {
        fullName: 'WEI PAN',
        school: 'CS',
        name: 'Parrot Bebop Drone(Blue)',
        dueDate: '03 May 2023',
        Email: 'wei.pan@student.manchester/ac.uk',
        idList: ['test01', 'test02', 'test03', 'test04']
      },
      {
        fullName: 'Normair Masud Ahmed',
        school: 'CS',
        name: 'Humidity Sensor',
        dueDate: '03 May 2023',
        Email: 'normair.masud.ahmed@student.manchester/ac.uk',
        idList: ['test01', 'test02', 'test03', 'test04']
      },
      {
        fullName: 'Maria steey',
        school: 'CS',
        name: 'Oculus Quest 2 128GB',
        dueDate: '03 May 2023',
        Email: 'maria.steey@student.manchester/ac.uk',
        idList: ['test01', 'test02', 'test03', 'test04']
      },
      {
        fullName: 'Daniel biju',
        school: 'CS',
        name: 'Oculus Quest 2 128GB',
        dueDate: '03 May 2023',
        Email: 'daniel.biju@student.manchester/ac.uk',
        idList: ['test01', 'test02', 'test03', 'test04']
      }
    ]
  },
  methods: {
    handleEditComponent(rowData) {
      // this.dialogData = rowData
      // this.show = true
    },
    handleCollectedClick(rowData) {
      const { fullName, idList } = rowData
      this.collectTitle = fullName
      this.idList = idList
      this.collectedVisible = true
    },
    handleDeleteClick({ name }) {
      this.$confirm('Are you sure to Delete?', '', {
        type: 'warning'
      }).then(_ => {
        const findIndex = this.tableData.findIndex(f => f.name === name)
        this.tableData.splice(findIndex, 1)
        this.$message.success('Deleted!')
      }).catch(e => {
        console.log('cancel')
      })
    },
    doCollection() {

      setTimeout(() => {
        this.$message.success('Collected success')
        this.collectedVisible = false
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.reservation {
  height: 100%;
  width: 1200px;

  .list {
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #F3F3F3;
    overflow: auto;

    .component {
      color: #0657ec;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.collect-dialog {
  :deep .el-dialog__body {
    padding-bottom: 0;
  }
}
</style>