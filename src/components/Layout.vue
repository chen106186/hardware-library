<template>
  <div class="main-container">
    <header class="hl-header">
      <span class="name">Hardware Library</span>
      <el-menu class="menu" mode="horizontal" background-color="#0d5f06" text-color="#fff" active-text-color="#ffd04b"
        :default-active="activeIndex" @select="handleSelect">
        <el-menu-item v-for="item in routeList" :key="item.name" :index="item.path">
          {{ item.meta.title }}
        </el-menu-item>
      </el-menu>
    </header>
    <div class="hl-content">
      <!-- <section class="left-menu">
                  <div class="menu-list">
                    <div class="menu-item" v-for="item in routeList" :key="item.name"
                      :class="{ 'selected': item.meta.title === currentRoute.meta.title }" @click="changeMenu(item)">
                      {{ item.meta.title }}
                    </div>
                  </div>
                </section> -->
      <section class="main-page">
        <TopTitle />
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
export default {
  data() {
    return {
      activeIndex: '/home',
      routeList: []
    }
  },
  components: { TopTitle },
  computed: {
    currentRoute() {
      return this.$route
    }
  },
  created() {
    const routes = this.$router.options.routes
    this.routeList = routes.filter(r => !r.hidden && !['404', 'Login'].includes(r.name))
    this.activeIndex = this.$route.matched[0].path
  },
  methods: {
    changeMenu({ path }) {
      this.$router.push({ path })
    },
    handleSelect(path) {
      this.activeIndex = path
      this.$router.push({ path })
    }
  }

}
</script>

<style scoped lang="scss">
.main-container {
  height: 100vh;
  overflow: hidden;

  .hl-header {
    height: 40px;
    padding: 20px;
    background-color: #0d5f06;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .name {
      font-size: 30px;
      color: #fff;
    }

    .menu {
      flex: 1;
      margin-left: 8.5%;
    }

    :deep .el-menu.el-menu--horizontal {
      border-bottom: transparent;
      white-space: nowrap;
    }

    :deep .el-menu-item {
      font-size: 18px;

      &:hover {
        color: #F8D263 !important;
        background-color: transparent !important;
      }
    }
  }

  .hl-content {
    position: relative;
    height: calc(100% - 110px);
    padding:0 10px 10px;
    display: flex;
    justify-content: center;
    overflow: auto;

    .left-menu {
      position: fixed;
      left: 50px;
      top: 90px;
      bottom: 10px;
      overflow: auto;
      width: 240px;
      background-color: #fff;
      z-index: 10;

      .menu-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .menu-item {
          width: 200px;
          padding: 0 5px;
          height: 40px;
          line-height: 40px;
          background-color: #bcaef6;
          border-bottom: 1px solid #C5C5C5;
          cursor: pointer;
          margin-bottom: 10px;
          border-radius: 4px;

          &.selected {
            background-color: #7652f8;
            color: #fff;
          }
        }
      }
    }

    .main-page {
      position: relative;
      width: 1000px;
      height: fit-content;
    }
  }

}
</style>
