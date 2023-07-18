<template>
  <div class="integration">
    <div class="main">
      <div class="left">
        <img src="../assets/gather/logo.jpg" alt="" />
        <div class="logotitle">
          <h2>联动保供</h2>
          <h3>COMPANYNAME</h3>
        </div>
      </div>
      <span class="action">
        <a class="logout_title" href="javascript:;" @click="handleLogout">
          <a-icon type="logout" />
          <span v-if="isDesktop()">&nbsp;退出登录</span>
        </a>
      </span>
    </div>
  </div>
  <!-- <div class="nav">
      <div class="left">
        <img src="../assets/gather/logo.jpg" alt="" />
        <div class="logotitle">
          <h2>联动保供</h2>
          <h3>COMPANYNAME</h3>
        </div>
      </div>
      <div class="right">
        <span class="action">
          <a class="logout_title" href="javascript:;" @click="handleLogout">
            <a-icon type="logout" />
            <span v-if="isDesktop()">&nbsp;退出登录</span>
          </a>
        </span>
      </div>
    </div> -->

  <!-- <div class="main">
      <div class="title">联动保供平台</div>
      <div class="content">
        <div class="btn btn1" @click="showFirst">CCC链数字孪生系统</div>
        <div class="btn btn2" @click="showSecond">智能计划与调度系统</div>
        <div class="btn btn3" @click="showThird">装箱线仿真系统</div>
      </div>
    </div>

    <div class="bootom" v-if="first">
      <div class="item" @click="toIndex">
        <img src="../assets/gather/icon/shafa.png" alt="" />
        <span>AAA保供数据库管理系统</span>
      </div>
      <div class="item" @click="toImage">
        <img src="../assets/gather/icon/bijiben.png" alt="" />
        <span>XXX画像系统</span>
      </div>
      <div class="item" @click="toImage1">
        <img src="../assets/gather/icon/xiangbao.png" alt="" />
        <span>AAA评价系统</span>
      </div>
    </div>
    <div class="bootom" v-if="second">
      <div class="item">
        <img src="../assets/gather/icon/xiangbao.png" alt="" />
        <span>智能计划调度</span>
      </div>
    </div>
    <div class="bootom" v-if="third">
      <div class="item">
        <img src="../assets/gather/icon/bijiben.png" alt="" />
        <span>装线箱实时监控</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/xiangbao.png" alt="" />
        <span>装箱计划仿真</span>
      </div>
    </div>
  </div> -->
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'integration',
  mixins: [mixinDevice],
  data() {
    return {
      first: true,
      second: false,
      third: false
    }
  },
  methods: {
    showFirst() {
      this.first = true
      this.second = false
      this.third = false
    },
    showSecond() {
      console.log(2)
      this.first = false
      this.second = true
      this.third = false
    },
    showThird() {
      console.log(3)
      this.first = false
      this.second = false
      this.third = true
    },
    toIndex() {
      this.$router.push({
        path: '/dashboard/analysis'
      })
    },
    toImage() {
      let routeData = this.$router.resolve({
        path: '/portrait/index'
      })
      window.open(routeData.href, '_blank')
    },
    toImage1() {
      let routeData = this.$router.resolve({
        path: '/evaluation'
      })
      window.open(routeData.href, '_blank')
    },
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
    handleLogout() {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              // update-begin author:scott date:20211223 for:【JTC-198】退出登录体验不好
              that.$router.push({ path: '/user/login' })
              window.location.reload()
              // update-end author:scott date:20211223 for:【JTC-198】退出登录体验不好
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.integration {
  background-color: rgb(243, 243, 243);
  position: relative;

  .nav {
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;

    .left {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
      }
      .logotitle {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        h2 {
          font-size: 28px;
          font-weight: 800;
          margin: 0;
        }
        h3 {
          font-size: 18px;
          letter-spacing: 3px;
          margin: 0;
        }
      }
    }
    .right {
      color: #1890ff;
    }
  }

  .main {
    width: 100%;
    height: 100vh;
    background: url(../assets/gather/bgc.jpeg) no-repeat;
    background-size: 100%;

    // background-size: contain;

    .title {
      text-align: center;
      padding-top: 100px;
      font-size: 50px;
      color: #20aee4;
    }
    .content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 30px;
      color: #fff;
      align-items: center;
      padding-top: 100px;
      .btn {
        cursor: pointer;
        width: 400px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-size: contain;
      }
      .btn1 {
        background: url('../assets/gather/btn3.jpeg') no-repeat;
      }
      .btn2 {
        background: url('../assets/gather/btn2.jpeg') no-repeat;
      }
      .btn3 {
        background: url('../assets/gather/btn3.jpeg') no-repeat;
      }
    }
  }

  .bootom {
    position: absolute;
    background-color: rgb(250, 250, 250);
    height: 130px;
    width: 86%;
    bottom: 50px;
    left: 110px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #553bb1;

      img {
        width: 45px;
      }

      span {
        font-weight: 550;
        font-size: 16px;
        color: black;
        margin-top: 10px;
      }
    }
  }
}
</style>
