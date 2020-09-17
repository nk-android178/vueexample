<template>
  <div class="map" ref="map">
    <canvas ref="canvas" class="canvas"></canvas>
    <div style="display:none">
      <img ref="image" src="../assets/image/map.png" />
    </div>
    <div class="camera1 mark" ref="camera1">
      <i>勋波桌子</i>
      <span class="icon"></span>
      <div class="sign">{{ sign1 }}</div>
      <div class="snapshot top left">
        <img :src="snapshot1" v-show="snapshot1 !== ''" />
      </div>
    </div>
    <div class="camera2 mark" ref="camera2">
      <i>万工桌子</i>
      <span class="icon"></span>
      <div class="sign">{{ sign2 }}</div>
      <div class="snapshot top right">
        <img :src="snapshot2" v-show="snapshot2 !== ''" />
      </div>
    </div>
    <div class="camera3 mark" ref="camera3">
      <i>李工桌子</i>
      <span class="icon"></span>
      <div class="sign">{{ sign3 }}</div>
      <div class="snapshot bottom left">
        <img :src="snapshot3" v-show="snapshot3 !== ''" />
      </div>
    </div>
    <div class="camera4 mark" ref="camera4">
      <i>冯工桌子</i>
      <span class="icon"></span>
      <div class="sign">{{ sign4 }}</div>
      <div class="snapshot bottom right only">
        <img :src="snapshot4" v-show="snapshot4 !== ''" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import randomColor from "randomcolor";
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      timer: null,
      ctx: null,
      sign1: "",
      sign2: "",
      sign3: "",
      sign4: ""
    };
  },
  computed: {
    ...mapState({
      getCaremeList: state => state.caremeList,
      getUserId: state => state.userId,
      snapshot1: state => state.snapshot1,
      snapshot2: state => state.snapshot2,
      snapshot3: state => state.snapshot3,
      snapshot4: state => state.snapshot4
    })
  },
  watch: {
    screenWidth() {
      this.initCanvas();
    },
    getUserId() {
      this.clearData();
      this.initCanvas();
    },
    getCaremeList: {
      handler() {
        this.clearData();
        this.drawTrack();
      },
      deep: true
    }
  },
  mounted() {
    const self = this;
    self.initCanvas();
    //自适应
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        self.screenWidth = window.screenWidth;
      })();
    };
  },
  beforeDestroy() {
    this.clearInterval();
  },
  methods: {
    clearInterval() {
      clearInterval(this.timer);
      this.timer = null;
    },
    //初始化canvas
    initCanvas() {
      const canvas = this.$refs.canvas;
      this.ctx = canvas.getContext("2d");
      let w = this.$refs.map.offsetWidth;
      let h = this.$refs.map.offsetHeight;
      canvas.setAttribute("width", w);
      canvas.setAttribute("height", h);
      let img = this.$refs.image;
      //第一次图片加载
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0, w, h);
      };
      this.clearInterval();
      this.ctx.clearRect(0, 0, w, h);
      this.ctx.drawImage(img, 0, 0, w, h);
    },
    clearData() {
      this.sign1 = "";
      this.sign2 = "";
      this.sign3 = "";
      this.sign4 = "";
      this.$store.commit("getSnapshot1", "");
      this.$store.commit("getSnapshot2", "");
      this.$store.commit("getSnapshot3", "");
      this.$store.commit("getSnapshot4", "");
    },
    //画线
    async drawTrack() {
      let self = this;
      self.initCanvas();
      const caremeList = self.$store.state.caremeList;
      const position1 = {
        name: "勋波桌子",
        axisX:
          self.$refs.camera1.offsetLeft + self.$refs.camera1.offsetWidth / 2,
        axisY:
          self.$refs.camera1.offsetTop + self.$refs.camera1.offsetHeight / 2 + 7
      };

      const position2 = {
        name: "万工桌子",
        axisX:
          self.$refs.camera2.offsetLeft + self.$refs.camera2.offsetWidth / 2,
        axisY:
          self.$refs.camera2.offsetTop + self.$refs.camera2.offsetHeight / 2 + 7
      };

      const position3 = {
        name: "李工桌子",
        axisX:
          self.$refs.camera3.offsetLeft + self.$refs.camera3.offsetWidth / 2,
        axisY:
          self.$refs.camera3.offsetTop + self.$refs.camera3.offsetHeight / 2 + 7
      };

      const position4 = {
        name: "冯工桌子",
        axisX:
          self.$refs.camera4.offsetLeft + self.$refs.camera4.offsetWidth / 2,
        axisY:
          self.$refs.camera4.offsetTop + self.$refs.camera4.offsetHeight / 2 + 7
      };

      //每一个摄像头的消息
      const positionList = [];
      caremeList.forEach(item => {
        if (item.camera_sn == "14:13:46:56:15:95") {
          positionList.push({ ...item, ...position1 });
        }
        if (item.camera_sn == "14:13:46:55:fa:31") {
          positionList.push({ ...item, ...position2 });
        }
        if (item.camera_sn == "14:11:5d:8d:c6:3b") {
          positionList.push({ ...item, ...position3 });
        }
        if (item.camera_sn == "14:13:46:55:eb:9b") {
          positionList.push({ ...item, ...position4 });
        }
      });
      console.log(positionList);
      self.$store.commit("getPositionList", positionList);

      //延迟一秒画线
      async function sleep(time) {
        return new Promise(res => {
          self.timer = setTimeout(res, time);
        });
      }

      //画线的顺序
      for (let i = 0; i < positionList.length; i++) {
        self.ctx.beginPath();
        self.ctx.lineWidth = 2;
        //随机色画线
        const color = randomColor({
          luminosity: "random",
          hue: "random"
        });
        self.ctx.strokeStyle = color;
        switch (positionList[i].name) {
          case "勋波桌子":
            self.sign1 = self.sign1 == "" ? i + 1 : `${self.sign1} - ${i + 1}`;
            self.$store.commit("getSnapshot1", positionList[i].snapshot);
            break;
          case "万工桌子":
            self.sign2 = self.sign2 == "" ? i + 1 : `${self.sign2} - ${i + 1}`;
            self.$store.commit("getSnapshot2", positionList[i].snapshot);
            break;
          case "李工桌子":
            self.sign3 = self.sign3 == "" ? i + 1 : `${self.sign3} - ${i + 1}`;
            self.$store.commit("getSnapshot3", positionList[i].snapshot);
            break;
          case "冯工桌子":
            self.sign4 = self.sign4 == "" ? i + 1 : `${self.sign4} - ${i + 1}`;
            self.$store.commit("getSnapshot4", positionList[i].snapshot);
            break;
          default:
            break;
        }
        self.ctx.moveTo(positionList[i].axisX, positionList[i].axisY);
        if (i + 1 < positionList.length) {
          self.ctx.lineTo(positionList[i + 1].axisX, positionList[i + 1].axisY);
        } else {
          self.ctx.moveTo(positionList[i].axisX, positionList[i].axisY);
        }
        await sleep(1000);
        self.ctx.stroke();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.map {
  height: 100%;
  position: relative;
  background-color: #1e3c52;
  overflow: hidden;
  .mark {
    position: absolute;
    i {
      font-size: 12px;
      color: red;
      text-align: center;
    }
    .icon {
      display: block;
      margin: 0 auto;
      width: 32px;
      height: 32px;
      background-image: url(~@/assets/image/mark-icon.png);
      background-size: cover;
    }
    .sign {
      position: absolute;
      width: 500%;
      left: 10%;
    }
    .snapshot {
      position: absolute;
      width: 100px;
      height: 100px;
      &.top {
        top: -90px;
      }
      &.bottom {
        bottom: -110px;
      }
      &.left {
        left: -100px;
      }
      &.right {
        right: -100px;
      }
      &.only {
        right: -20px;
        bottom: -140px;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .camera1 {
    top: 57.2%;
    left: 49%;
  }
  .camera2 {
    top: 58.2%;
    left: 61.4%;
  }
  .camera3 {
    top: 71.2%;
    left: 44%;
  }
  .camera4 {
    top: 72%;
    left: 60%;
  }
  .button {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
