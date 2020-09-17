#比对
<template>
  <div class="container">
    <el-header>
      <h1>比对</h1>
    </el-header>
    <el-container>
      <el-aside class="left">
        <person-list></person-list>
      </el-aside>
      <el-main class="main">
        <Map></Map>
      </el-main>
      <el-aside class="right">
        <careme-list></careme-list>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
import PersonList from "../../components/personList";
import CaremeList from "../../components/caremeList";
import Map from "../../components/map";
export default {
  components: {
    PersonList,
    CaremeList,
    Map
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
  width: 300px;
  overflow: hidden;
  background-color: #1e2630;
}
.main {
  flex: 1;
}
</style>
