<template>
  <div class="container">
    <el-header>
      <h1>人脸跟踪轨迹</h1>
    </el-header>
    <el-container>
      <el-aside class="left">
        <left-menu></left-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import LeftMenu from "../components/LeftMenu";
// import MainIndex from "../views/main/mainindex";
export default {
  components: {
    LeftMenu
    // MainIndex
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
.container {
  width: 100%;
  height: 100%;
}
.left {
  flex: 2;
  overflow: hidden;
  background-color: #1e2630;
}
.main {
  flex: 8;
}
.el-main {
  padding: 5px;
}
</style>
