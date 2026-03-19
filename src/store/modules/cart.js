import { getCartList, changeCount, handelDel } from '@/api/cart'
import { Toast } from 'vant'

export default {
  name: 'cart',
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      if (!goods) {
        console.log('未找到商品 ID:', goodsId)
        return
      }
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, Checked) {
      state.cartList.forEach(item => {
        item.isChecked = Checked
      })
    },
    changeCount (state, { goodsId, value }) {
      const obj = state.cartList.find(item => item.goods_id === goodsId)
      obj.goods_num = value
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsId, value, skuId } = obj
      context.commit('changeCount', {
        goodsId,
        value
      })
      await changeCount(goodsId, value, skuId)
    },
    async delSelect (context) {
      const sel = context.getters.selCartList.map(item => item.id)
      await handelDel(sel)
      Toast('删除成功')
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 求所有商品的总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 选中商品
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
