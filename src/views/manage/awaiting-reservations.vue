<template>
  <div class="reservation">
    <div class="sub-title">
      Please note the below reservations are listed the order they came through. Be aware that approving a booking takes
      a few seconds to send the email so do not leave the page until the confirmation message arrives.
    </div>
    <div class="list">
      <h3>Awaiting Reservations</h3>
      <el-table border :data="tableData" :header-cell-style="headerCellStyle">
        <el-table-column label="Full Name" prop="fullName"></el-table-column>
        <el-table-column label="School" prop="school" width="80"></el-table-column>
        <el-table-column label="Component Name" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="component" @click="handleEditComponent(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Due Date" prop="dueDate" width="100"></el-table-column>
        <el-table-column label="Email" prop="Email" show-overflow-tooltip></el-table-column>
        <el-table-column label="Approve For Collection" width="170">
          <template slot-scope="scope">
            <el-button @click="handleApproveClick(scope.row)" type="primary" size="small">Approve</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Item Unavailable" width="180">
          <template slot-scope="scope">
            <el-button @click="handleRefuseClick(scope.row)" type="warning" size="small">Refuse</el-button>
            <el-button @click="handleDeleteClick(scope.row)" type="danger" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <ComponentDialog :c-visible.sync="show" :c-data="dialogData"></ComponentDialog>
    </div>
  </div>
</template>

<script>
import table from '@/mixins/table'
import ComponentDialog from '@/views/components/ComponentDialog.vue'

export default {
  name: 'awaiting-reservations',
  components: { ComponentDialog },
  mixins: [table],
  data() {
    return {
      tableData: [],
      show: false,
      dialogData: {}
    }
  },
  mounted() {
    this.tableData = [
      {
        fullName: 'George Sigma',
        school: 'CS',
        available: 2,
        total: 3,
        name: 'Oculus Quest 2 128GB',
        dueDate: '03 May 2023',
        Email: 'george.sima@student.manchester/ac.uk',
        imagePath: 'assets/test-image.png',
        category: 'Adafruit',
        website: 'http://www.hobbytronics.co.uk/adc-i2c-slace',
        detail: `Components in web development are reusable pieces of code that allow you to create complex and interactive user interfaces. They are a key concept in modern front-end frameworks like React, Angular, and Vue.js, and play a crucial role in building scalable and maintainable applications.Components are designed to encapsulate logic and state, making it easier to reuse and test code. They also help to break down complex applications into smaller, more manageable parts. With components, developers can build complex UI`,
        fileList: [],
        pdfFilePath: '',
        identifies: [
          { uniqueID: '1459', status: 'Available' },
          { uniqueID: '1462', status: 'Missing' },
          { uniqueID: '1915', status: 'Available' }]
      },
      {
        fullName: 'Jack hson',
        school: 'CS',
        name: 'Oculus Quest 2 128GB',
        dueDate: '03 May 2023',
        Email: 'Jack.hson@student.manchester/ac.uk'
      },
      {
        fullName: 'Maria steey',
        school: 'CS',
        name: 'Oculus Quest 2 128GB',
        dueDate: '03 May 2023',
        Email: 'maria.steey@student.manchester/ac.uk'
      },
      {
        fullName: 'Daniel biju',
        school: 'CS',
        name: 'Oculus Quest 2 128GB',
        dueDate: '03 May 2023',
        Email: 'daniel.biju@student.manchester/ac.uk'
      }
    ]
  },
  methods: {
    handleEditComponent(rowData) {
      this.dialogData = rowData
      this.show = true
    },
    handleApproveClick() {
      this.$confirm('Are you sure to Approve?', '', {
        type: 'warning'
      }).then(_ => {
        this.$message.success('Approved!')
      }).catch(e => {
        console.log('cancel')
      })
    },
    handleRefuseClick() {
      this.$confirm('Are you sure to Refuse?', '', {
        type: 'warning'
      }).then(_ => {
        this.$message.success('Refused!')
      }).catch(e => {
        console.log('cancel')
      })
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

</style>