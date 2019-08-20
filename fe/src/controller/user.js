import userView from '../views/user.art'

let _url = ''
let _type = ''
export default {
    render() {
        let html = userView({
            isSignin: false
        })
        $('.user-menu').html(html)
        this.bindEventToBtn()
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
    }
}