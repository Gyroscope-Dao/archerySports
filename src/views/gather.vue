<template>
  <div class="integration">
    <div class="nav">
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
    </div>

    <div class="main">
      <div class="title">联动保供平台</div>
      <div class="content">
        <div class="btn btn1" @click="toIndex">联动保供管理系统</div>
        <div class="btn btn2" @click="toImage">供应商画像系统</div>
        <div class="btn btn3" @click="toImage1">联动保供平台</div>
      </div>
    </div>

    <div class="bootom">
      <div class="item">
        <img src="../assets/gather/icon/shizhong.png" alt="" />
        <span>供应商保供数据库</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/aixin.png" alt="" />
        <span>供应链仿真</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/qiche.png" alt="" />
        <span>智能计划管理</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/shafa.png" alt="" />
        <span>智能调度管理</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/bijiben.png" alt="" />
        <span>装线箱实时监控</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/xiangbao.png" alt="" />
        <span>装箱计划仿真</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'integration',
  mixins: [mixinDevice],
  methods: {
    toIndex() {
      this.$router.push({
        path: '/dashboard/analysis',
      })
    },
    toImage() {
      let routeData = this.$router.resolve({
        path: '/portrait/index',
      })
      window.open(routeData.href, '_blank')
    },
    toImage1() {
      let routeData = this.$router.resolve({
        path: '/evaluation',
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
            .catch((err) => {
              that.$message.error({
                title: '错误',
                description: err.message,
              })
            })
        },
        onCancel() {},
      })
    },
  },
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
    height: 550px;
    background-image: url(../assets/gather/bgc.jpeg);
    background-size: contain;

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