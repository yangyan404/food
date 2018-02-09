Vue.component('data-list',{
  //声明props
  props:['listdata', 'query'],
  template:'#data-list',
  methods:{
    toDetail: function (id) {
      // 把id传过去
      sessionStorage.setItem('id', id);
      //跳转到详情页
      window.location.href = 'detail.html';
    }
  }
});
var bonapp_index = new Vue({
  el: '#root',
  data:{
    select: -1,
    selectdata:{
      cuisines:[],
      area:{
        neighborhoods:[],
        districts:[],
        delivery:''
      },
      prices:[]
    },
    searchdata:{
      searchKey:'',
      cuisine:'',
      neighborhood:'',
      rating:1,
      limit:10,
      sort:'rating.desc',
      averagePrice:'',
      page:0
    },
    searchUrl:'http://iservice.itshsxt.com/restaurant/find',
    //list数据
    listdata:[],
    //分布信息
    query:{
      slider:[]
    },
    login:false, //默认没有登录
    user:{}
  },
  //组件创建之后
  created: function () {
    //console.log('创建....');
    //请求下拉数据
    this.$http.get('js/cuisine_area.json')
      .then(function (result) {
        console.log(result.body);
        this.selectdata = result.body;
      });
    //初始化查询数据
    this.search();
    //判断是否登录
    var user = sessionStorage.getItem('user');
    if(!!user){
      this.user = JSON.parse(user);
      this.login = true;
    }
  },
  computed:{
    condition(){
      return this.searchdata.cuisine
        || this.searchdata.averagePrice
        || this.searchdata.neighborhood;
    }
  },
  methods:{
    showSelect: function(num){
      // 判断若果当前值等于改值,代表已经展开
      if(num == this.select){
        this.select = -1;
      }else{
        this.select = num;
      }
    },
    setValue: function(value, type){
      // 关闭select
      this.select = -1;
      //console.log(value);
      //设值
      if(type == 'page'){
        this.searchdata[type] = value;
      }else{
        this.searchdata[type] = value;
        this.searchdata.page = 0;//重置从第一页开始
      }

      //console.log(this.searchdata);
      //更新数据
      this.search();
    },
    clearValue: function () {
      this.searchdata.averagePrice = '';
      this.searchdata.cuisine = '';
      this.searchdata.neighborhood = '';
      //更新数据
      this.search();
    },
    search: function () {
      console.log(this.searchdata);
      //请求后台数据
      this.$http.jsonp(this.searchUrl, {params: this.searchdata})
      .then(function (result) {
        var data = result.body;
        console.log(data);
        this.listdata = data.result;
        this.query = data.query;
      }, function () {
        alert('系统繁忙!');
      });
    },
    logout: function () {
      this.login = false;
      sessionStorage.removeItem('user');
    },
    toLogin: function(type){
      sessionStorage.setItem('type', type);
      // 跳转到登录页
      window.location.href = 'signup.html';
    }
  }
});