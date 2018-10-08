 <template>
     <div class="bg">
       <p class="top-tip">请选择申卡银行查询办卡进度</p>
       <div class="content-bg" v-if="list.length > 0" >
         <div v-for="item in list" :key="item.id">
          <div class="cell" @click="cellOnClick(item.link, item.type)">
             <img class="cell-img" :src="item.icon"/>
            <p class="cell-text">{{ item.bankName }}</p>
           </div>
         </div>
       </div>
         <toast :showToast.sync="toastShow" :toastContent="toastContent" @dismiss="dismiss"></toast>
     </div>
 </template>

<script>
import Toast from '@/components/index/Toast'
import wanka from '@/modules/wanka'
import http from '@/modules/http'
export default {
  data () {
    return {
      toastShow: false,
      toastContent: '',
      list: [],
      list2: []
    }
  },
  methods: {
    cellOnClick (link, type) {
      if (wanka.isWanka()) {
        // 内链
        if (type === 0) {
          wanka.ToAppPage(link, null, false)
        } else {
        // 外链
          wanka.ToBrowserFromAppPage(link)
        }
      } else {
        window.location.href = link
      }
    },
    loadBankListData () {
      this.loadData('/creditCardProgress/getList', {
        limit: 100000
      }, 'loadDataCallBack')
    },
    loadDataCallBack (res) {
      if (wanka.isWanka()) {
        this.list = res.responseData.page.list
      } else {
        this.list = res.page.list
      }
    },
    showToast (content) {
      if (content.length === 0) return
      this.toastShow = true
      this.toastContent = content
    },
    dismiss () {
      this.toastShow = false
      let a = 1
    }
  },
  comments: {

  },
  computed: {

  },
  components: {
    Toast
  },
  created () {
    window.loadDataCallBack = this.loadDataCallBack
    this.loadData = this.$http.loadData

    this.loadBankListData()
  }

}
</script>

<style lang="postcss" scoped>
.bg {
    min-height: 667px;
    background-color: #F6F7F8;
}
.top-tip {
  padding-left: 7px;
  display: block;
  color: #878DA0;
  font-size: 12px;
  height: 46px;
  width: 100%;
  line-height: 46px;
}
.content-bg {
  padding-left: 15px;
  background-color: white;
  width: 100%;
  height: auto;
  padding-top: 5px;
  padding-bottom: 20px;
  position: relative;
  display: flex;
  flex-wrap: wrap;

}
.cell {
  -webkit-tap-highlight-color: transparent;
  margin-top: 15px;
  margin-left: 0px;
  width: 86px;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cell-img {
  width: 42px;
  height: 42px;
  border-radius: 21px;
}
.cell-text {
  margin-top: 10px;
  color: #1C2042;
  font-size: 12px;
  line-height: 17px;
}
</style>
