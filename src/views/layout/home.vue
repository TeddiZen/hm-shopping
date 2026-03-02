<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="智慧商城" fixed />

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请在此输入搜索关键词"
      @click="$router.push('/search')"
    />

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in this.banaList" :key="index" >
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>

    <!-- 导航 -->
    <van-grid :column-num="5" :icon-size="40" :clickable="true" :border="false" >
      <van-grid-item
        v-for="({imgUrl, text}, index) in this.navList" :key="index"
        :icon="imgUrl"
        :text="text"
        @click="$router.push('/category')"
      />
    </van-grid>

    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <GoodsItem :listInfo="item" v-for="(item, index) in this.proList" :key="index"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeData } from '@/api/home'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'HomePage',
  components: {
    GoodsItem
  },
  data () {
    return {
      banaList: [], // 轮播
      navList: [], // 导航
      proList: [] // 商品
    }
  },
  async created () {
    const res = await getHomeData()
    console.log(res)
    this.banaList = res.data.pageData.items[1].data
    this.navList = res.data.pageData.items[3].data
    this.proList = res.data.pageData.items[6].data
  }

}
</script>

<style lang="less" scoped>
// 主题 padding
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}

// 分类导航部分
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

// 猜你喜欢
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
