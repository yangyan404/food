var bonapp_detail= new Vue({
  el:'#root',
  data:{
    detailUrl:'http://iservice.itshsxt.com/restaurant/detail/',
    restaurantData:{}
  },
  //初始化请求数据
  created: function () {
    var id = sessionStorage.getItem('id');
    this.$http.jsonp(this.detailUrl+id)
      .then(function (result) {
        console.log(result.body);
        this.restaurantData = result.body.result;
        this.restaurantData.images = result.body.result.images.splice(0,6);
      });
  },
  filters:{
    imgUrl: function (value) {
      return "background:url("+value+") no-repeat 0 0;"
    }
  }
});