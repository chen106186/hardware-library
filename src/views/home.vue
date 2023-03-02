<template>
  <div class="home">
    <h3 class="homeScript">
      Welcome to the Computer Science Hardware Library<br /><br />
      <span v-if="!isAdmin">You will be able to see your reserved and collected items below, propose new items and look
        through our list
        of components to reserve what you may wish.
      </span>
      <span v-else>
        You will be able to see navigate through past, current and awaiting bookings, see component proposals from the
        students, send emails for items collection or their unavailabirty, for sending reminders about returning an item,
        send a personal message, remove components and update all their information about a component the database.
      </span>
    </h3>
    <div class="homeSearch">
      <h3>Components<br /></h3>
      <div class="filter">
        <el-select v-model="category" @change="filterList">
          <el-option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.name">
          </el-option>
        </el-select>
        <el-input v-model="input" placeholder="Components"></el-input>
        <el-button type="success" size="mini" @click="doSearch">search</el-button>
      </div>
      <div class="homeComponents" :style="{ '--grid': gridCount }" v-loading="loading">
        <InfoCard v-for="(item, index) in dataList" :key="index" :info="item" @show="showDetail" @del="handleDelete" />
        <el-empty v-if="dataList && !dataList.length" description="No Results"></el-empty>
      </div>
    </div>
    <div v-if="!isAdmin" class="homePropose">
      <h3> Can't find what you're looking for? </h3>
      <el-button type="success" @click="goPropose">propose</el-button>
    </div>
    <div v-if="!isAdmin" class="homePropose-fix">
      <h3> Got a question? </h3>
      <div>Free to <a target="_blank" href="https://www.google.com">contact</a> us!</div>
    </div>
    <el-dialog center :visible.sync="detailDlgVisible" :title="detailData.name">
      <div class="detail">
        <div class="container">
          <div class="left-content">
            <p> {{ detailData.detail }} </p>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="right-info">
            <img class="right-img" :src="detailData.image">
            <div class="action">
              <span>return date:</span>
              <el-date-picker value-format="yyyy-MM-dd" class="select-date" v-model="selectDate"
                size="small"></el-date-picker>
              <el-button type="warning" size="small" @click="addCart">Add to cart</el-button>
            </div>
          </div>
          <div class="website">
            <span class="ws-p">website</span> :dasdas
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="admin-dialog" width="1000px" top="6vh" center :visible.sync="adminDlgVisible"
      @close="handleAdminClose">
      <div slot="title">
        <span class="edit-title" contenteditable="true">
          {{ adminDetailData.name }}
        </span>
      </div>
      <div class="note">
        <span class="el-icon-warning"></span>
        Please note you can edit all the bordered areas on this page if you hover over and click on the highlighted
        fields. All the changes will be saved to the database once you will press the Save
        button ff you need to add a new category. please separate these by comma. In the websites area. you can Cerl - Lef
        Click or RignClick to follovv link instead of editing it.
      </div>
      <el-form ref="adminDetailForm" :model="adminDetailData" class="edit-form" label-width="120px">
        <el-form-item class="detail-item">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" v-model="adminDetailData.detail"> </el-input>
        </el-form-item>
        <el-form-item label="Available:">
          <el-input style="width: 100px;" v-model="adminDetailData.available"></el-input>
          <span class="at">/</span>
          <el-input style="width: 100px;" v-model="adminDetailData.total"></el-input>
        </el-form-item>
        <el-form-item label="categories:">
          <el-input style="width: 300px;" v-model="adminDetailData.category"></el-input>
          <span class="cs">(comma separateed)</span>
        </el-form-item>
        <el-form-item label="Websites:">
          <el-input style="width: 300px;" v-model="adminDetailData.website"></el-input>
        </el-form-item>
        <el-form-item label="Image file path:">
          <el-input style="width: 300px;" v-model="adminDetailData.imagePath"></el-input>
        </el-form-item>
        <el-form-item label="Change Image:">
          <el-upload class="upload-demo" :multiple="false" action="" :on-preview="handlePreview" :on-remove="handleRemove"
            :before-remove="beforeRemove" :on-exceed="handleExceed" :file-list="adminDetailData.fileList">
            <el-button size="small" type="primary">click to upload</el-button>
            <div slot="tip" class="el-upload__tip">Select your file,the 'image file path' will then be updated and you can
              save changes below.</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Identifies:">
          <el-table :data="adminDetailData.identifies" style="width: 100%" :header-cell-style="headerCellStyle">
            <el-table-column prop="uniqueID" label="UniqueID">
            </el-table-column>
            <el-table-column prop="status" label="status">
            </el-table-column>
            <el-table-column label="operate">
              <template slot-scope="scope">
                <el-button @click="handleEditClick(scope.row)" type="warning" size="small">edit</el-button>
                <el-button type="danger" size="small" @click="handleRemoveClick(scope.row)">remove</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="New UniqueID:">
          <el-input style="width: 180px;" v-model="uniqueID"></el-input>
          <el-button style="margin-left: 20px;" type="primary" @click="handleAddUniqueID">Add</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import InfoCard from '@/components/InfoCard.vue'
export default {
  data() {
    return {
      activeNames: ['1'],
      originCollapseList: [
        {
          id: 'hl1',
          title: "All",
          tableData: [{
            name: '10 CH ADC',
            available: '4',
            total: '5',
            image: require('../assets/404.jpg'),
            imagePath: 'assets/test-image.png',
            category: 'Adafruit',
            website: 'http://www.hobbytronics.co.uk/adc-i2c-slace',
            detail: `Components in web development are reusable pieces of code that allow you to create complex and interactive user interfaces. They are a key concept in modern front-end frameworks like React, Angular, and Vue.js, and play a crucial role in building scalable and maintainable applications.Components are designed to encapsulate logic and state, making it easier to reuse and test code. They also help to break down complex applications into smaller, more manageable parts. With components, developers can build complex UI`,
            dueDate: '2023-05-01',
            fileList: [],
            pdfFilePath: '',
            identifies: [{ uniqueID: '1459', status: 'Available' }, { uniqueID: '1462', status: 'Missing' }, { uniqueID: '1915', status: 'Available' },]
          }, {
            name: 'test test elliapseelliapseelliapseelliapse',
            available: '10',
            image: require('../assets/404.jpg'),
            detail: 'hi come on',
            dueDate: '2023-05-02'
          }, {
            name: 'dddd',
            available: '6',
            image: require('../assets/404.jpg'),
            detail: ''
          }, {
            name: 'ddemo',
            available: '6',
            image: require('../assets/404.jpg'),
            detail: ''
          }, {
            name: 'guss',
            available: '5',
            image: require('../assets/404.jpg'),
            detail: ''
          }]
        },
        {
          id: 'hl2',
          title: "Adafruit",
          tableData: [{
            name: '10 CH ADC',
            available: '4',
            image: require('../assets/404.jpg'),
            detail: 'hahahha you jdsjdjfajdcxncdh dsdioidosjadkj'
          }]
        },
        {
          id: 'hl3',
          title: "Arduino",
          tableData: [{
            name: 'dddd',
            available: '6',
            image: require('../assets/404.jpg'),
            detail: ''
          },
          {
            name: 'test',
            available: '10',
            image: require('../assets/404.jpg'),
            detail: ''
          }]
        },
        {
          id: 'hl4',
          title: "Audio",
          tableData: [{
            name: 'ddemo',
            available: '6',
            image: require('../assets/404.jpg'),
            detail: ''
          },
          {
            name: 'guss',
            available: '5',
            image: require('../assets/404.jpg'),
            detail: ''
          }]
        }
      ],
      collapseList: [],
      gridCount: 4,
      category: "hl1",
      categoryList: [],
      dataList: [],
      input: '',
      detailDlgVisible: false,
      detailData: { name: '', detail: '', image: '' },
      selectDate: '',
      loading: false,
      adminDlgVisible: true,
      adminDetailData: { fileList: [], pdfFilePath: '', identifies: [] },
      uniqueID: ''
    }
  },
  computed: {
    isAdmin() {
      const role = sessionStorage.getItem('role')
      return role === '1'
    }
  },
  components: { InfoCard },
  created() {
    this.collapseList = JSON.parse(JSON.stringify(this.originCollapseList))
    this.categoryList = this.originCollapseList.map((v, idx) => ({ id: 'hl' + (idx + 1), name: v.title, tableData: v.tableData }))
    this.filterList()
  },
  methods: {
    filterList() {
      const baseData = JSON.parse(JSON.stringify(this.originCollapseList))
      const categoryData = baseData.find(v => v.id === this.category)
      this.dataList = categoryData ? categoryData.tableData : []
      this.gridCount = this.dataList.length ? 4 : 1
    },
    doSearch() {
      this.loading = true
      this.dataList = []

      const baseData = JSON.parse(JSON.stringify(this.originCollapseList))
      const categoryData = baseData.find(v => v.id === this.category)
      const listData = categoryData.tableData
      if (this.input) {
        this.dataList = listData.filter(v => v.name.includes(this.input))
      } else {
        this.dataList = listData
      }
      this.gridCount = this.dataList.length ? 4 : 1
      this.loading = false
    },
    handleChange(val) {
      console.log(val)
    },
    goPropose() {
      this.$router.push('/propose/index')
    },
    showDetail(data) {
      this.detailData = data
      this.adminDetailData = data
      this.isAdmin ? (this.adminDlgVisible = true) : (this.detailDlgVisible = true)
    },
    addCart() {
      if (!this.selectDate) {
        this.$message.error("Please select return date!")
        return
      }
      this.detailData.dueDate = this.selectDate
      let localCartList = localStorage.getItem('cart-list')
      if (!localCartList || localCartList === 'undefined' || !localCartList.length) {
        localCartList = []
      } else {
        localCartList = JSON.parse(localCartList)
      }
      const findItem = localCartList.find(v => v.name === this.detailData.name)
      if (findItem) {
        findItem.quantity++
        findItem.dueDate = this.selectDate
      } else {
        localCartList.push(this.detailData)
      }
      localStorage.setItem('cart-list', JSON.stringify(localCartList))
      this.$message({
        type: "success",
        message: 'Add cart success',
        showClose: true
      })
    },
    handleDelete(item) {
      const _self = this
      this.$confirm('Are you sure delete this components?', 'warning', { type: 'warning' })
        .then(_ => {
          const findIndex = _self.dataList.findIndex(v => v.name === item.name)
          _self.dataList.splice(findIndex, 1)
        })
        .catch(_ => {
          console.log("cancel")
        })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`limit 1 file but you selected ${files.length} files`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Are you sure remove ${file.name}？`);
    },
    headerCellStyle() {
      return { backgroundColor: '#2A323F', color: '#fff', padding: 0 }
    },
    handleEditClick() {
  
    },
    handleRemoveClick({ uniqueID }) {
      this.$confirm('Are you sure to remove this item?', 'warning', { type: 'warning' })
        .then(_ => {
          const idIndex = this.adminDetailData.identifies.findIndex(v => v.uniqueID === uniqueID)
          this.adminDetailData.identifies.splice(idIndex, 1)
          this.adminDetailData.available = +this.adminDetailData.available--
          this.adminDetailData.total = +this.adminDetailData.total--
        }
        ).catch(_ => {
          console.log("cancel")
        })
    },
    handleAddUniqueID() {
      if (!this.uniqueID.trim()) {
        this.$message.error('UniqueID can not be empty!')
        return
      }
      this.adminDetailData.identifies.push({ uniqueID: this.uniqueID, status: 'Available' })
    },
    handleAdminClose() {
      document.getElementsByClassName('edit-form')[0].scrollTop = 0
      this.uniqueID = ""
    }
  }

}

</script>
<style scoped lang="scss">
.home {
  background-color: #F3F3F3;
  width: 1000px;
  padding: 10px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  .homeTitle {
    text-align: center;
    font-size: 22px;
    color: blue;
  }

  .homeComponents {
    margin-top: 20px;
    flex: 1;
    min-height: 300px;
    max-height: 800px;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(var(--grid), 1fr);
    justify-items: center;
    grid-row-gap: 20px;

    :deep .el-collapse-item {
      margin-bottom: 10px;

      .el-collapse-item__header {
        background-color: #e3e3e3;
        padding: 0 20px;
        color: #000;
        background-color: #b7d2ae;
      }
    }

    .row-link {
      text-decoration: underline;
      color: #3919b0;
      cursor: pointer;
    }

    .row-img {
      width: 50px;
      height: 50px;
    }
  }



  .homeScript,
  .homeSearch {
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #2A5E19;

    h3 {
      padding: 0 20px;
    }

    .filter {
      display: flex;
      padding: 0 10px;

      >:deep .el-input {
        margin: 0 10px;
      }
    }
  }

  .homeScript {
    padding: 10px 20px;
  }

  .homePropose {
    height: 100px;
    padding: 10px;
    border: 1px solid #2A5E19;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .homePropose-fix {
    position: fixed;
    right: 20px;
    bottom: 100px;
    border: 1px solid #E5E5E5;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 10px 5px 0px #e3e3e3;
    background-color: #fff;

    h3 {
      color: darkorange;
      margin: 5px 0;
    }
  }
}

.container {
  padding: 10px 20px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 10px;

  .left-content {
    .title {
      font-size: 22px;
    }
  }

  :deep .el-divider--vertical {
    height: 100%;
  }

  .right-info {

    .right-img {
      width: 100%;
      height: 90%;
    }

    .action {
      text-align: center;

      .select-date {
        width: 150px;
        margin: 0 10px;
      }
    }


  }

  .website {
    grid-column-start: 1;
    grid-column-end: 3;

    .ws-p {
      font-size: 20px;
    }
  }
}

.admin-dialog {
  :deep .el-dialog {
    height: 770px;
    overflow: hidden;

    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 0;
      margin: 10px 0;
    }
  }


  .edit-title {
    padding: 5px;
    border: 1px dashed #2A323F;
    border-radius: 5px;
  }

  .note {
    padding: 5px;
    font-size: 14px;
    font-weight: bold;

    :deep .el-icon-warning {
      color: orange;
    }
  }

  .edit-form {
    margin-top: 10px;
    padding: 10px 15px;
    border: 1px solid #283240;
    height: 540px;
    overflow: auto;

    .at {
      margin: 0 20px;
      font-size: 20px;
    }

    .cs {
      color: orange;
      padding-left: 10px;
    }

    .detail-item {
      :deep .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
}
</style>
<style>
.el-collapse-item__wrap {
  padding: 10px;
}
</style>