<template>
  <div class="home">
    <h3 class="homeScript">
      Welcome to the Computer Science Hardware Library<br /><br />
      You will be able to see your reserved and collected items below, propose new items and look through our list of
      components to reserve what you may wish.
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
        <InfoCard v-for="(item, index) in dataList" :key="index" :info="item" @show="showDetail" />
        <el-empty v-if="dataList && !dataList.length" description="No Results"></el-empty>
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
            image: require('../assets/404.jpg'),
            detail: `Components in web development are reusable pieces of code that allow you to create complex and interactive user interfaces. They are a key concept in modern front-end frameworks like React, Angular, and Vue.js, and play a crucial role in building scalable and maintainable applications.Components are designed to encapsulate logic and state, making it easier to reuse and test code. They also help to break down complex applications into smaller, more manageable parts. With components, developers can build complex UI`,
            dueDate: '2023-05-01'
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
          id: 'hl23',
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
          id: 'hl3',
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
      loading: false
    }
  },
  components: { InfoCard },
  created() {
    this.collapseList = JSON.parse(JSON.stringify(this.originCollapseList))
    this.categoryList = this.originCollapseList.map((v, idx) => ({ id: 'hl' + (idx + 1), name: v.title }))
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
      debugger
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