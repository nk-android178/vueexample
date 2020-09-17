<template>
  <div class="container">
    <div class="header">
      <h3>轨迹信息</h3>
    </div>
    <div class="list" v-if="dataList.length > 0">
      <el-card class="box-card" v-for="(item, index) in dataList" :key="index">
        <div class="info" @click="getSnapshot(item.camera_sn, index)">
          <h3>
            <span class="number">{{ index + 1 }}</span>
            {{ item.camera_name }}
          </h3>
          <p>{{ timeFormatChange(item.create_time) }}</p>
        </div>
        <div :class="{ active: active == index }"></div>
      </el-card>
    </div>
    <div class="noList" v-else>
      <div class="tip">没有摄像头数据.......</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      dataList: [],
      positionList: [],
      camera_sn: "",
      active: null
    };
  },
  computed: {
    ...mapState({
      getUserId: state => state.userId,
      getPositionList: state => state.positionList
    })
  },
  watch: {
    getUserId() {
      this.getDataList(this.$store.state.userId);
    },
    getPositionList: {
      handler() {
        this.getPositionData();
      },
      deep: true
    }
  },
  methods: {
    timeFormatChange(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    async getDataList(id = 15) {
      this.active = null;
      const { data } = await this.$axios.get(
        `https://ftestapi.skyids.com:20000/smart/api/v1/camera-records/user/${id}`
      );
      if (data.data.length == 0) {
        this.dataList = [];
        return;
      }
      this.dataList = data.data;
      this.$store.commit("getCaremeList", this.dataList);
    },
    getSnapshot(id, index) {
      this.active = index;
      const data = this.positionList[index];
      if (id == "14:13:46:56:15:95") {
        this.$store.commit("getSnapshot1", data.snapshot);
      }
      if (id == "14:13:46:55:fa:31") {
        this.$store.commit("getSnapshot2", data.snapshot);
      }
      if (id == "14:11:5d:8d:c6:3b") {
        this.$store.commit("getSnapshot3", data.snapshot);
      }
      if (id == "14:13:46:55:eb:9b") {
        this.$store.commit("getSnapshot4", data.snapshot);
      }
    },
    getPositionData() {
      this.positionList = this.$store.state.positionList;
    }
  },
  created() {
    this.getDataList();
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 15px;
  .header {
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    margin-bottom: 15px;
    background-color: #343c46;
    h3 {
      color: #fff;
      position: relative;
      padding-left: 50px;
    }
    h3::before {
      content: "";
      background-color: #0081e4;
      width: 12px;
      height: 12px;
      display: block;
      position: absolute;
      left: 20px;
      top: 8px;
      border-radius: 50%;
    }
  }
  .list {
    height: calc(100% - 35px);
    overflow: auto;
    .box-card {
      height: 85px;
      color: #fff;
      background-color: #1e2630;
      margin: 5px 0;
      margin-right: 10px;
      border: 1px solid rgba(235, 238, 245, 0.22);
      /deep/ .el-card__body {
        height: 100%;
        padding: 10px 15px;
        position: relative;
        .info {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          h3 {
            height: 18px;
            line-height: 18px;
            .number {
              display: inline-block;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background-color: red;
              text-align: center;
              line-height: 18px;
              font-size: 12px;
              margin-right: 2px;
              vertical-align: top;
            }
          }
        }
        .active {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: #0081e452;
        }
      }
    }
  }
  .list::-webkit-scrollbar {
    border-radius: 5px;
    width: 5px;
    background-color: #343c46;
  }
  .list::-webkit-scrollbar-thumb {
    background-color: #838c98;
  }
  .tip {
    color: #fff;
    font-size: 14px;
  }
}
</style>
