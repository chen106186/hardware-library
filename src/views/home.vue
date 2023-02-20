<template>
  <div class="home">
    <div class="homeScript">
      Welcome to the Computer Science Hardware Library<br /><br />
      You will be able to see your reserved and collected items below, propose new items and look through our list of
      components to reserve what you may wish.
    </div>
    <div class="homeSearch">
      <h3>Components<br /></h3>
      <el-input v-model="input" @input="doSearch" placeholder="Components"></el-input>
      <div class="homeComponents">
        <el-collapse v-model="activeNames" @change="handleChange" width="1000">
          <el-collapse-item v-for="(item, index) in collapseList" :key="index" :name="item.title" :title="item.title">
            <el-table border :data="item.tableData" style="width: 100%;" stripe>
              <el-table-column prop="name" label="Name">
                <template slot-scope="scope">
                  <span class="row-link" @click="goDetail(scope.row)">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="available" label="Available" width="120">
              </el-table-column>
              <el-table-column prop="image" label="Image" width="120">
                <template slot-scope="scope">
                  <img class="row-img" :src="scope.row.image">
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="homePropose">
      <h3> Can't find what you're looking for? </h3>
      <el-button type="success" @click="goPropose">propose</el-button>
    </div>
    <div class="homePropose-fix">
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
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeNames: ['1'],
      originCollapseList: [
        {
          title: "All",
          tableData: [{
            name: '10 CH ADC',
            available: '4',
            image: require('../assets/404.jpg'),
            detail: `Components in web development are reusable pieces of code that allow you to create complex and interactive user interfaces. They are a key concept in modern front-end frameworks like React, Angular, and Vue.js, and play a crucial role in building scalable and maintainable applications.Components are designed to encapsulate logic and state, making it easier to reuse and test code. They also help to break down complex applications into smaller, more manageable parts. With components, developers can build complex UI`,
            dueDate: '2023-05-01'
          }, {
            name: 'test',
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
          title: "Adafruit",
          tableData: [{
            name: '10 CH ADC',
            available: '4',
            image: require('../assets/404.jpg'),
            detail: 'hahahha you jdsjdjfajdcxncdh dsdioidosjadkj'
          }]
        },
        {
          title: "Arduino",
          tableData: [{
            name: 'dddd',
            available: '6',
            image: require('../assets/404.jpg'),
            detail: ''
          }, {
            name: 'test',
            available: '10',
            image: require('../assets/404.jpg'),
            detail: ''
          }]
        },
        {
          title: "Audio",
          tableData: [{
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
        }
      ],
      collapseList: [],
      input: '',
      detailDlgVisible: false,
      detailData: { name: '', detail: '', image: '' },
      selectDate: ''
    }
  },
  created() {
    this.collapseList = JSON.parse(JSON.stringify(this.originCollapseList))
  },
  methods: {
    doSearch() {
      this.activeNames = []
      if (this.input) {
        this.originCollapseList.forEach(collapse => {
          const { title, tableData } = collapse
          const findItem = this.collapseList.find(c => c.title === title)
          findItem.tableData = tableData.filter(v => v.name.includes(this.input))
          if (findItem.tableData && findItem.tableData.length) {
            this.activeNames.push(title)
          }
        })
      } else {
        this.collapseList = JSON.parse(JSON.stringify(this.originCollapseList))
      }

    },
    handleChange(val) {
      console.log(val)
    },
    goPropose() {
      this.$router.push('/propose/index')
    },
    goDetail(data) {
      //localStorage.setItem('detail', JSON.stringify(data))
      // this.$router.push('/home/detail')
      const strDetail = localStorage.getItem('detail')
      this.detailData = data
      this.detailDlgVisible = true
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
    }
  }

}

</script>
<style scoped lang="scss">
.home {
  background-color: #F3F3F3;
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
    outline: 4px;
    outline-offset: 15px;
    border-radius: 5px;
    border: 1px solid #2A5E19;
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
</style>
<style>
.el-collapse-item__wrap {
  padding: 10px;
}
</style>