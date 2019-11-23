<template>
  <div id="app">
    <HelloWorld @pickdate="filterlist" />
    <div class="list">
      <div class="left-list">
        <div class="title">dayList</div>
        <div class="content">
          <span v-for="(item,index) in daylist" :key="index">{{item}}</span>
        </div>
      </div>
      <div class="right-list">
        <div class="title">monthList</div>
        <div class="content">
          <span v-for="(item,index) in monthlist" :key="index">{{item}}</span>
        </div>
      </div>
    </div>
    <div class="filter-list">
      <div class="left-list">
        <div class="title">dayFliterList</div>
        <div class="content">
          <span v-for="(item,index) in dayfilterlist" :key="index">{{item}}</span>
        </div>
      </div>
      <div class="right-list">
        <div class="title">monthFliterList</div>
        <div class="content">
          <span v-for="(item,index) in monthfilterlist" :key="index">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    this.dayfilterlist = this.daylist;
    this.monthfilterlist = this.monthlist;
  },
  data() {
    return {
      daylist: [
        "2018/01/01",
        "2019/01/01",
        "2019/11/11",
        "2019/11/12",
        "2019/11/13"
      ],
      dayfilterlist: [],
      monthlist: ["2018/01", "2019/01", "2019/09", "2019/10", "2019/11"],
      monthfilterlist: []
    };
  },
  methods: {
    filter(param, value) {
      let filterval = param.filter(item => {
        return item == value;
      });
      return filterval;
    },
    filterlist(val, idx) {
      console.log(val, idx, "val,idx");

      if (!idx) {
        this.dayfilterlist =
          val.indexOf("all") != -1
            ? this.daylist
            : this.filter(this.daylist, val);
        // if (val.indexOf("all")!=-1) {
        //   this.dayfilterlist = this.daylist;
        //   return;
        // }
        // this.dayfilterlist = this.daylist.filter(item => {
        //   return item == val;
        // });
      } else {
        this.monthfilterlist =
          val.indexOf("all") != -1
            ? this.monthlist
            : this.filter(this.monthlist, val);
      }
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .list,.filter-list {
    display: flex;
    justify-content: space-between;
    padding: 50px 30px;
    .title {
      font-weight: bold;
      font-size: 20px;
    }
    .content {
      margin-top: 20px;
      span {
        display: block;
        color: red;
      }
    }
  }
}
</style>
