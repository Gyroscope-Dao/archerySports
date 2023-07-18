<template>
  <div class="integration">
    <div class="main">
      <div class="left">
        <!-- <img src="../assets/gather/logo1.png" alt="" style="width: 12vh; margin: 0 auto;transform: translateX(3px);display: left: 70px;;" /> -->
        <div class="logotitle">
          <h2 style="color:#000;margin:0; font-weight: bolder;">XXXXXXXXXX平台</h2>
          <h3 class="smallTitle">lalalalalallalalalalalalalalalalal</h3>
        </div>
      </div>
      <span class="action">
        <a class="user_control" href="javascript:;" @click="userControl">
          <a-icon type="setting" style="color: #000" />
          <span style="color:#000">&nbsp;用户管理&nbsp;&nbsp;</span>
        </a>
        <a class="logout_title" href="javascript:;" @click="handleLogout">
          <a-icon type="logout" style="color: #000" />
          <span v-if="isDesktop()" style="color:#000">&nbsp;退出登录</span>
        </a>
      </span>
      <div class="secondRegion">
        <div class="secondTitle">
          <div style="padding: 2vh 5vh 5vh;border-radius: 3vh;" @mouseover="addActive_0($event)" @mouseout="removeActive_0($event)">
            <div class="imgPosition" style="display: flex;flex-direction: row;">
              <img src="../assets/gather/icon/icon_system_mind.png" alt="" style="position: relative;bottom: 1vh;">
              <div class="" @click="showFirst" style="margin-left: 2vh;">XXX与XXX系统<br/><span>XXXXXXXXXXXXX PLANNING AND SCHEDULING SYSTEM</span></div>
            </div>
            <div style="display: flex; justify-content: center; margin-top: 10vh;">
              <div class="item" @click="toPlan">
                <img src="../assets/gather/icon/icon_plan_mind.png" alt=""/>
                <span>XXX计划</span>
              </div>
              <div class="item" @click="toDiaodu">
                <img src="../assets/gather/icon/icon_dispatch_mind.png" alt=""/>
                <span>XXX调度</span>
              </div>
            </div>
          </div>

          <div style="padding: 2vh 5vh 5vh; border-radius: 3vh; width: 35%;" @mouseover="addActive_1($event)" @mouseout="removeActive_1($event)">
            <div class="imgPosition" style="display: flex;flex-direction: row; justify-content: center;">
              <img src="../assets/gather/icon/icon_digit_supplier.png" alt="" style="position: relative;bottom: 1vh;">
              <div class="" @click="showSecond" style="margin-left: 2vh;">XXXXXXXXXXXX仿真系统<br/><span>SUPPLY XXX DIGITAL TWIN SIMULATON SYSTEN</span></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10vh;">
              <div class="item" @click="toIndex">
                <img src="../assets/gather/icon/icon_database_supplier.png" alt=""/>
                <span>射箭打靶<br/>数据库管理</span>
              </div>
              <div class="item" @click="toImage">
                <img src="../assets/gather/icon/icon_portrait_supplier.png" alt=""/>
                <span>XXX画像</span>
              </div>
              <div class="item" @click="toImage3">
                <img src="../assets/gather/icon/icon_monitor_supplier.png" alt=""/>
                <span>XXX过程<br/>监控</span>
              </div>
              <div class="item" @click="toImage2" style="top: 100px;">
                <img src="../assets/gather/icon/icon_phantom_supplier.png" alt=""/>
                <span>XXX链仿真</span>
              </div>
            </div>
          </div>

          <div style="padding: 2vh 5vh 5vh; border-radius: 3vh;" @mouseover="addActive_2($event)" @mouseout="removeActive_2($event)">
            <div class="imgPosition" style="display: flex;flex-direction: row;">
                <img src="../assets/gather/icon/icon_monitor_packing_1.png" alt="" style="position: relative;bottom: 1vh;">
                <div class="" @click="showThird" style="margin-left: 2vh;">XXXXXXXXX实时监控系统<br/><span>XXXXX TIME MONITORING SYSTEM FOR PACKING DIGITAL TWINS</span></div>
            </div>
            <div style="display: flex; justify-content: center; margin-top: 10vh;">
              <div class="item" @click="toEmulate">
                <img src="../assets/gather/icon/icon_control_packing_1.png" alt=""/>
                <span>lllLLL实时监控</span>
              </div>
              <div class="item" @click="tomonitor">
                <img src="../assets/gather/icon/icon_line_packing_1.png" alt=""/>
                <span>LLLL线仿真</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="thirdLineWord">强大安全稳定的产品及服务<br/><span>//强大安全稳定的产品及服务//</span></div> -->
      <!-- <div class="modelFun footer">
        <div class="item" @click="toPlan">
          <img src="../assets/gather/icon/icon_plan_mind.png" alt=""/>
          <span>智能计划</span>
        </div>
        <div class="item" @click="toDiaodu">
          <img src="../assets/gather/icon/icon_dispatch_mind.png" alt=""/>
          <span>智能调度</span>
        </div>

        <div class="item" @click="toIndex">
          <img src="../assets/gather/icon/icon_database_supplier.png" alt=""/>
          <span>AAA保供数<br/>据库管理</span>
        </div>
        <div class="item" @click="toImage">
          <img src="../assets/gather/icon/icon_portrait_supplier.png" alt=""/>
          <span>XXX画像</span>
        </div>
        <div class="item" @click="toImage3">
          <img src="../assets/gather/icon/icon_monitor_supplier.png" alt=""/>
          <span>CCC过程监控</span>
        </div>
        <div class="item" @click="toImage2" style="top: 100px;">
          <img src="../assets/gather/icon/icon_phantom_supplier.png" alt=""/>
          <span>CCC链仿真</span>
        </div>

        <div class="item" @click="toEmulate">
          <img src="../assets/gather/icon/icon_control_packing_1.png" alt=""/>
          <span>装线箱实时监控</span>
        </div>
        <div class="item" @click="tomonitor">
          <img src="../assets/gather/icon/icon_line_packing_1.png" alt=""/>
          <span>装箱线仿真</span>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
import { mapActions, mapGetters, mapState } from 'vuex'
import {gongbaologin,huaxiangLogin,pingjiaLogin,zhinengjihuaLogin, diaoduLogin,jiankongLogin,fangzhenLogin} from '@/api/api'

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
    userControl() {
      this.$router.push({
        path: '/isystem/user'
      })
      
    },
    toIndex() {
      this.$router.push({
        path: '/dashboard/analysis'
      })
      gongbaologin()
    },
    toImage() {
      let routeData = this.$router.resolve({
        path: '/portrait/index'
      })
      window.open(routeData.href, '_blank')
      huaxiangLogin()
    },
    toImage1() {
      let routeData = this.$router.resolve({
        path: '/evaluation'
      })
      window.open(routeData.href, '_blank')
      pingjiaLogin()
    },
    toImage2() {
      let routeData = this.$router.resolve({
        path: '/simulationInf/simulationInfList'
      })
      window.open(routeData.href, '_blank')
      pingjiaLogin()
    },

    
    toImage3() {
      let routeData = this.$router.resolve({
        path: '/firstKeyprocessInf/firstKeyprocessInfList'
      })
      window.open(routeData.href, '_blank')
      pingjiaLogin()
    },

    // //飞书
    // toPlan() {
    //   let routeData = this.$router.resolve({
    //     // path: '/evaluation'
    //   })
    //   window.open("SunloginClient://", '_blank')
    //   // pingjiaLogin()
    // },
    // //百度
    // toDiaodu() {
    //   let routeData = this.$router.resolve({
    //     // path: '/evaluation'
    //   })
    //   // window.open('https:\\www.baidu.com', '_blank')
    //   window.location.href='http://baidu.com'
    //   // pingjiaLogin()
    // },
    // //百度
    // toEmulate() {
    //   let routeData = this.$router.resolve({
    //     // path: '/evaluation'
    //   })
    //   window.open('https:\\www.baidu.com', '_blank')
    //   // pingjiaLogin()
    // },
    // //百度
    // tomonitor() {
    //   let routeData = this.$router.resolve({
    //     // path: '/evaluation'
    //   })
    //   // window.open('https:\\www.baidu.com', '_blank')
    //   window.location.href="http://10.132.10.32:3000"
    //   // pingjiaLogin()
    // },
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
        onCancel() {

        }
      })
    },
    addActive_0($event) {
			$event.currentTarget.className = 'borderStyleNew_0'
		},
		removeActive_0($event) {
			$event.currentTarget.className = ''
		},
    addActive_1($event) {
			$event.currentTarget.className = 'borderStyleNew_1'
		},
		removeActive_1($event) {
			$event.currentTarget.className = ''
		},
    addActive_2($event) {
			$event.currentTarget.className = 'borderStyleNew_2'
		},
		removeActive_2($event) {
			$event.currentTarget.className = ''
		},


  },

}
</script>

<style lang="less" scoped>
.integration {
  background-color: #fff;
  // text-align: center;
  // position: relative;

  .main {
    width: 100%;
    height: 60%;
    background: url(../assets/gather/banner.png) no-repeat;
    background-size: 100%;
    position: relative;
    .left {
      position: absolute;
      left: 25%;
      z-index: 3;
      top: 12vh;
      transform: translateX(-50%);
      display: flex;
    }
    .logotitle {
      text-align: center;
      font-size: 4.5vh;
      color: #000000;
      line-height: 11.5vh;
      margin-left: 15vh;
      .smallTitle{
        color: #999;
        font-size: 2vh;
        line-height: 5vh;
        margin-left: 26vh;
        width: 69%;
        text-align: left;
        .imgPosition{
          display: flex;
          flex-direction: row;
          img{
            width: 10vh;
            height: 10vh;
          }
          span{
            color: #99ABB8;
          }
        }
      }
    }
    .action {
      color: #000000;
      position: absolute;
      right: 10px;
      top: 8px;
    }
    .secondRegion{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 9vh;
      background-color:rgba(255,255,255,0.6);
    }
    .secondTitle{
      height: auto;
      color: #000;
      display: flex;
      justify-content: space-around;
      // margin: 2vh 0;
      font-size: 2vh;
      font-weight: bolder;
      span{
        color: rgb(118, 114, 114);
        font-size: 1vh;
      }
    }
    .borderStyleNew_0{
      background: rgba(71, 235, 213, 0.2);
      display: flex;
      flex-direction: column;
    }
    .borderStyleNew_1{
      // background: rgba(57, 131, 254, 0.2);
      background: #b8e0f069;
      display: flex;
      flex-direction: column;
    }.borderStyleNew_2{
      background: rgba(254, 164, 78, 0.2);
      display: flex;
      flex-direction: column;
    }
    .thirdLineWord{
      width: 100%;
      height: auto;
      text-align: center;
      color: #000;
      font-size: 3vh;
      font-weight: bolder;
      position: absolute;
      bottom: -14vh;
      span{
        font-size: 2vh;
        color:rgb(118, 114, 114)
      }
    }
    .modelFun{
      // width: 15%;
      height: auto;
      display: flex;
      justify-content: space-around;
      margin: 0 10%;
    }
    .footer{
      position: absolute;
      bottom: -35vh;
    }

    .item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #553bb1;
      // position: relative;
      border-radius: 45px;
      margin-right: 10px;
      img {
        width: 11vh;
        padding: 2vh;
        border-radius: 50%;
      }
      span {
        font-weight: 550;
        font-size: 2vh;
        color: #000000;
        margin-top: 10px;
        display: flex;
        text-align: center;
      }
    }
    } 
}
</style>
