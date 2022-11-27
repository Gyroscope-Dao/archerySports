<template>
  <div class="integration">
    <div class="nav">
      <div class="left">
        <img src="../assets/gather/logo.jpg" alt="" />
        <div class="logotitle">
          <h2>区块链</h2>
          <h3>COMPANYNAME</h3>
        </div>
      </div>
      <div class="right">Home</div>
    </div>

    <div class="main">
      <div class="title">区块链</div>
      <div class="content">
        <div class="btn1">区块链</div>
        <div class="btn2">区块链</div>
        <div class="btn3">区块链</div>
      </div>
    </div>

    <div class="bootom">
      <div class="item">
        <img src="../assets/gather/icon/shizhong.png" alt="">
        <span>区块链数据库</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/aixin.png" alt="">
        <span>区块链仿真</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/qiche.png" alt="">
        <span>智能计划管理</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/shafa.png" alt="">
        <span>智能调度管理</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/bijiben.png" alt="">
        <span>区块链实时监控</span>
      </div>
      <div class="item">
        <img src="../assets/gather/icon/xiangbao.png" alt="">
        <span>区块链仿真</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "integration",
};
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
        h3 {
          letter-spacing: 3px;
        }
      }
    }
  }

  .main {
    width: 100%;
    height: 550px;
    background-image: url(../assets/gather/bgc.jpeg);
    background-size: contain;

    .title {
      padding-top: 100px;
      font-size: 50px;
      color: #fff;
    }
    .content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 30px;
      color: #fff;
      align-items: center;
      padding-top: 100px;
      .btn1 {
        width: 400px;
        height: 100px;
        line-height: 100px;
        background: url('../assets/gather/btn1.jpeg') no-repeat;
        background-size: 100%;
      }
      
      .btn2 {
        width: 400px;
        height: 100px;
        line-height: 100px;
        background: url('../assets/gather/btn2.jpeg') no-repeat;
        background-size: 100%;
      }

      .btn3 {
        width: 400px;
        height: 100px;
        line-height: 100px;
        background: url('../assets/gather/btn3.jpeg') no-repeat;
        background-size: 100%;
      }
    }
  }

  .bootom {
    position: absolute;
    background-color: rgb(250, 250, 250);
    height: 130px;
    width: 86%;
    bottom: -50px;
    left: 110px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    .item { 
      display: flex;
      flex-direction: column;
      align-items: center;
      color:  #553BB1;

      img {
        width: 45px;
      }

      span {
        margin-top: 10px;
      }
    }
  }
}
</style>