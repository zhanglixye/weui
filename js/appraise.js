$(function () {
    initEventAppraise();
})
function initEventAppraise(){
    $('.eval_1').on('click',function () {
        $('.eval_1').removeClass('cadetblue');
        $(this).addClass('cadetblue');
    });
    $('.eval_2').on('click',function () {
        $('.eval_2').removeClass('cadetblue');
        $(this).addClass('cadetblue');
    });
    $('.eval_3').on('click',function () {
        $('.eval_3').removeClass('cadetblue');
        $(this).addClass('cadetblue');
    });
    $('.eval_4').on('click',function () {
        $('.eval_4').removeClass('cadetblue');
        $(this).addClass('cadetblue');
    });
    $('#sumbit').on('click',function () {
        let obj = {};
        obj.institutionId = sessionStorage.getItem('institutionId') == null?'1_3_185':sessionStorage.getItem('institutionId');
        obj.value1 = $('.type1 .cadetblue').attr('value');
        obj.value2 = $('.type2 .cadetblue').attr('value');
        obj.value3 = $('.type3 .cadetblue').attr('value');
        obj.value4 = $('.type4 .cadetblue').attr('value');
        let area_input = $('.input_area').val();
        obj.remarks = area_input;
        //截取url
        let version = window.location.href.split('?')[1];
        try {
            $.ajax({
                timeout:1800000,
                type: 'POST',
                url: '/gateway/dynamic/restapi/vote?'+version,
                // post payload:
                data: JSON.stringify(obj),
                contentType: 'application/json',
                success:function (res) {
                    if (res.status.code === 500){
                        weui.toast(res.status.msg);
                    }
                    if (res.status.code === 200){
                        window.location.href = 'finish.html';
                    }
                },
                error:function (err) {
                    if (err.status == 500){
                        weui.toast('服务异常');
                    }
                }
            })
        }catch (e) {
            console.log(e);
        }
    })
};