<template>
  <div class="main">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <template v-for="item in menuData">
        <el-submenu
          v-if="item.children && item.children.length > 0"
          :key="item.id"
          :index="item.route"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children">
            <el-menu-item-group
              v-if="subitem.children && subitem.children.length > 0"
              :key="subitem.id"
              :index="subitem.route"
            >
              <el-menu-item
                v-for="ssubitem in subitem.children"
                :key="ssubitem.id"
                :index="ssubitem.route"
              >
                <i :class="ssubitem.icon"></i>
                {{ ssubitem.name }}
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item v-else :key="subitem.id" :index="subitem.route">
              <i :class="subitem.icon"></i>
              {{ subitem.name }}
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="item.route">
          <i :class="item.icon"></i>
          {{ item.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import MenuData from "../config/menu";
import _ from "lodash";
export default {
  name: "leftMenu",
  data() {
    return {
      menuData: []
    };
  },
  components: {
    // PersonList,
    // CaremeList,
    // Map
  },
  methods: {
    init() {
      let self = this;
      self.filterPermission();
    },
    // 过滤权限
    filterPermission() {
      let self = this;
      let menuData = [];
      function loopTree(treeArr, treeParent) {
        console.log(treeArr);
        console.log(treeParent);
        if (!treeArr || treeArr.length === 0) return;
        _.forEach(treeArr, item => {
          let menu = {
            id: item.id,
            name: item.name
          };
          // 是否有图标
          if (item.icon) {
            menu.icon = item.icon;
          }
          // 是否有路由
          if (item.route) {
            menu.route = item.route;
          }
          // 是否有权限值
          if (item.permissionCode) {
            menu.permissionCode = item.permissionCode;
          }
          // let isPermission = checkPermission(menu.permissionCode);
          // 是否有权限
          // if (isPermission) {
          treeParent.push(menu);
          if (item.children && item.children.length > 0) {
            menu.children = [];
            loopTree(item.children, menu.children);
          }
          // }
        });
      }
      loopTree(MenuData, menuData);
      self.menuData = menuData;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
    // toClose() {
    //   if (this.isClose === true) {
    //     this.isClose = false;
    //   } else {
    //     this.isClose = true;
    //   }
    // }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  height: 60px;
  line-height: 60px;
  background-color: #285679;
  h1 {
    color: #fff;
    font-size: 22px;
  }
}
.el-container {
  display: flex;
  height: calc(100vh - 60px);
}
.left,
.right {
  width: 100%;
  overflow: hidden;
  background-color: #1e2630;
}
.main {
  flex: 1;
}
// .el-icon-location {
//   background: url("../assets/image/menu_index.png") center no-repeat;
//   background-size: 18px;
// }
// .el-icon-location::before {
//   visibility: hidden;
//   content: "\e785";
//   font-size: 14px;
// }
// .el-icon-menu {
//   background: url("../assets/image/mark-icon.png") center no-repeat;
//   background-size: 18px;
// }
// .el-icon-menu::before {
//   visibility: hidden;
//   content: "\e785";
//   font-size: 14px;
// }
.el-menu-item.is-active i {
  color: inherit;
}
.el-menu-item i {
  color: #909399;
}
</style>
