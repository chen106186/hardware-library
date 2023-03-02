<template>
  <div class="main-container">
    <header class="hl-header" :style="{ '--bgColor': roleType === '6' ? '#0d5f06' : '#283240' }">
      <span class="name">Hardware Library</span>
      <el-menu v-show="roleType === '6'" class="menu" mode="horizontal" background-color="#0d5f06" text-color="#fff"
        active-text-color="#ffd04b" :default-active="activeIndex" @select="handleSelect">
        <el-menu-item v-for="item in routeList" :key="item.name" :index="item.path">
          {{ item.meta.title }}
        </el-menu-item>
      </el-menu>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="out">log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
    <div class="hl-content">
      <section class="left-menu" v-if="roleType === '1'">
        <el-menu class="menu" mode="vertical" background-color="#334154" text-color="#fff" active-text-color="#ffd04b"
          :default-active="activeIndex" @select="handleSelect">
          <el-menu-item v-for="item in routeList" :key="item.name" :index="item.path">
            {{ item.meta.title }}
          </el-menu-item>
        </el-menu>
      </section>
      <section :class="[roleType === '6' ? 'main-page' : 'main-page-vertical']">
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
      routeList: [],
      headBgColor: ''
    }
  },
  components: { TopTitle },
  computed: {
    currentRoute() {
      return this.$route
    },
    roleType() {
      return sessionStorage.getItem('role')
    },
    username() {
      return sessionStorage.getItem('user')
    }
  },
  created() {
    const routes = this.$router.options.routes
    this.routeList = routes.filter(r => !r.hidden && !['404', 'Login'].includes(r.name) && r.meta.role.includes(this.roleType))
    this.activeIndex = this.$route.matched[0].path
  },
  methods: {
    changeMenu({ path }) {
      this.activeIndex = path
      this.$router.push({ path })
    },
    handleSelect(path) {
      this.activeIndex = path
      this.$router.push({ path })
    },
    handleCommand(command) {
      ['token', 'user', 'role'].forEach(item => {
        sessionStorage.removeItem(item)
      })
      this.$router.replace('/login')
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
    background-color: var(--bgColor);
    display: flex;
    align-items: center;

    .name {
      font-size: 30px;
      color: #fff;
    }

    :deep .el-dropdown {
      position: absolute;
      right: 10px;
      color: #fff;
      cursor: pointer;
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
    height: calc(100% - 90px);
    padding: 0 10px 10px;
    display: flex;
    justify-content: center;
    overflow: auto;

    .left-menu {
      position: fixed;
      left: 0;
      top: 80px;
      bottom: 0;
      overflow: auto;
      width: 200px;
      background-color: #334154;
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

    .main-page-vertical {
      position: relative;
      margin: 10px 10px 10px 200px;
      height: fit-content;
    }
  }

}
</style>
