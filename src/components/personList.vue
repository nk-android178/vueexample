<template>
  <div class="container">
    <div class="header">
      <h3>人员列表</h3>
    </div>
    <div class="list" v-if="dataList.length > 0">
      <el-card
        class="box-card"
        v-for="(item, index) in dataList"
        :key="item.id"
      >
        <div class="img">
          <img :src="item.avatar" />
        </div>
        <div class="info" @click="getCaremes(item.user_id, index)">
          <h3>用户{{ item.user_id }}</h3>
          <p>{{ timeFormatChange(item.create_time) }}</p>
        </div>
        <div :class="{ active: active == index }"></div>
      </el-card>
    </div>
    <div class="noList" v-else>
      <div class="tip">没有人员数据.......</div>
    </div>
    <div class="pagination">
      <p>
        共 {{ total }} 条，每页 {{ pageSize }} 条，页码 {{ pageNo }} /{{
          pages
        }}
      </p>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      dataList: [],
      pageSize: 10,
      pageNo: 0,
      total: 0,
      pages: 0,
      userId: 0,
      active: 0
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getDataList(val);
    },
    timeFormatChange(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    async getDataList(page = 1) {
      const { data } = await this.$axios.get(
        `https://ftestapi.skyids.com:20000/smart/api/v1/faces?pageNo=${page}&pageSize=${this.pageSize}`
      );
      const { total, page_size, page_num, pages, list } = data.data;
      this.total = total;
      this.pageSize = page_size;
      this.pageNo = page_num;
      this.pages = pages;
      this.dataList = list;
      this.$store.commit("defaultId", this.dataList[0].user_id);
      this.getCaremes(this.dataList[0].user_id, 0);
    },
    getCaremes(id, index) {
      if (this.userId === id) return;
      this.userId = id;
      this.active = index;
      this.$store.commit("changeUseId", id);
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
    height: calc(100% - 100px);
    overflow: auto;
    .box-card {
      background-color: #1e2630;
      margin: 5px 0;
      margin-right: 10px;
      border: 1px solid rgba(235, 238, 245, 0.22);
      /deep/ .el-card__body {
        display: flex;
        position: relative;
        padding: 10px 5px;
        .img {
          img {
            width: 75px;
            height: 75px;
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 10px;
          color: #fff;
          cursor: pointer;
          h3 {
            margin-top: 5px;
            font-size: 20px;
          }
          p {
            font-size: 14px;
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
  .noList {
    height: calc(100% - 100px);
    color: #fff;
    font-size: 14px;
  }
  .pagination {
    .page {
      text-align: center;
      margin-top: 8px;
      /deep/ .btn-prev,
      /deep/ .btn-next {
        color: #fff;
        background-color: #0081e4;
        padding: 2px;
        font-size: 12px;
        height: 20px;
        margin-right: 8px;
      }
      /deep/ .el-icon.el-icon-arrow-left:before {
        content: "上一页";
      }
      /deep/ .el-icon.el-icon-arrow-right:before {
        content: "下一页";
      }
      /deep/ .el-pagination__jump {
        margin-left: 3px;
        color: #fff;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
      }
      /deep/ .el-input__inner {
        height: 20px;
        width: 40px;
        padding: 0;
        border: none;
        color: #606266;
        background-color: #343c46;
      }
    }
    p {
      font-size: 12px;
      text-align: center;
      color: #fff;
      margin-top: 14px;
    }
  }
}
</style>
