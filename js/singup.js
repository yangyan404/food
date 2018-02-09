var bonaApp_signup = new Vue({
  el: '#root',
  data: {
    signup: true,// 控制登录和注册
    logindata: {
      firstname: '',
      email: '',
      password: ''
    },
    signupdata: {
      email: '',
      password: ''
    },
    errorText: {
      firstname: 'Please input your firstname',
      email: 'Please input your Email',
      password: 'Please input your Password'
    },
    signupFirstname: '',
    signupEmail: '',
    signupPassword: '',
    loginEmail: '',
    loginPassword: '',
    // 注册
    signurl: 'http://iservice.itshsxt.com/diner/signup',
    loginurl: 'http://iservice.itshsxt.com/diner/login'
  },
  created:function(){
    // 获取session信息, 确定显示那个面板
    var type = sessionStorage.getItem('type');
    console.log(type);
    if(type == 'login'){
      this.signup = false;
    }
  },
  methods: {
    // 校验数据, 校验5个输入框
    valid: function (type) {
      // type 1 2 3 4 5
      // switch case
      switch (type) {
        case 1:
        {
          //console.log(this.logindata.firstname);
          if (this.logindata.firstname) {
            this.signupFirstname = ''
          } else {
            this.signupFirstname = this.errorText.firstname
          }
          break;
        }
        case 2:
        {
          if (this.logindata.email) {
            this.signupEmail = ''
          } else {
            this.signupEmail = this.errorText.email
          }
          break;
        }
        case 3:
        {
          if (this.logindata.password) {
            this.signupPassword = ''
          } else {
            this.signupPassword = this.errorText.password
          }
          break;
        }
        case 4:
        {
          if (this.signupdata.email) {
            this.loginEmail = ''
          } else {
            this.loginEmail = this.errorText.email
          }
          break;
        }
        case 5:
        {
          if (this.signupdata.password) {
            this.loginPassword = ''
          } else {
            this.loginPassword = this.errorText.password
          }
          break;
        }
      }
    },
    signupFn: function () {
      // 数据检验成功后,才能触发登录操作
      //console.log('登录');
      var flag = this.logindata.firstname && this.logindata.email && this.logindata.password;
      if (flag) {
        //console.log('校验成功');
        //发送Ajax请求 vue-resource 通过params传参
        this.$http.jsonp(this.signurl, {params: this.logindata})
          .then(function (result) {
            var msg = result.body;
            console.log(msg);
            if(msg.resultCode === 0){
              alert('注册失败! '+msg.message);
            }else if(msg.resultCode === 1){
              alert('恭喜用户['+msg.result.firstname+']注册成功!');
              // 切换到登录面板
              this.signup = false;
            }
          }, function () {
            alert('系统繁忙!');
          })
      } else {
        alert('请把数据填写完整!');
      }
    },
    login: function(){
      var flag = this.signupdata.email && this.signupdata.password;
      if(flag){
        this.$http.jsonp(this.loginurl, {params: this.signupdata})
        .then(function (result) {
          console.log(result.body);
          var msg = result.body;
          if(msg.resultCode === 0){
            alert('登录失败! '+msg.message);
          }else if(msg.resultCode === 1){
            alert('登录成功!');
            // 把用户的登录信息保存在sessionStorage中
            sessionStorage.setItem('user', JSON.stringify(msg.result));
            // 跳转到首页 index
            window.location.href = 'index.html';
          }
        }, function () {
          alert('系统繁忙!');
        });
      }else{
        alert('请把数据填写完整!');
      }
    }
  }
})