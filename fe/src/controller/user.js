import userView from '../views/user.art'

let _url = ''
let _type = ''
export default {
    async render() {
        let result = await this.isSignin()
        let html = userView({
            isSignin: result.ret,
            username: result.data.username
        })
        $('.user-menu').html(html)
        this.bindEventToBtn()
    },
    isSignin(){
        let date=new Date();
        let timer=date.getTime().toString();
           return $.ajax({
            url:'/api/users/isSignin',
            dataType:'json',
            success(result){
                return result
            }
            }) 
        
    },
    bindEventToBtn() {
        $(".hidden-xs").on('click', function () {
            _type = $(this).attr('id')
            _url = _type === 'btn-signin' ? '/api/users/signin' : '/api/users/signup'
            $('input').val('')
        })
        
        $('#btn-submit').on('click', function () {
            let data = $('#user-form').serialize()
            $.ajax({
                url: _url,
                type: "POST",
                data,
                success(result) {
                    if (_type === 'btn-signin') {
                        if (result.ret) {
                            let html = userView({
                                isSignin: true,
                                username: result.data.username
                            })
                            $('.user-menu').html(html)
                            $('.user-menu #btn-signout').on('click',() => {
                                $.ajax({
                                    url:'/api/users/signout',
                                    success(result){
                                        location.reload()
                                    }
                                })
                            })
                        } else {
                            alert(result.data.msg)
                        }
                    } else {
                        if (result.ret) {
                            alert('注册成功，可以登录了')
                        } else {
                            alert(result.data.msg)
                        }
                    }
                }
            })
        })
        $('.user-menu #btn-signout').on('click',() => {
            $.ajax({
                url:'/api/users/signout',
                success(result){
                    location.reload()
                }
            })
        })
    }
}