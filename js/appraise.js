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
        let arr = [];
        $('.cadetblue').each(function (index,item) {
            let value = $(item).attr('value');
            arr.push(value);
        })
        let area_input = $('.input_area').val();
        arr.push(area_input);
        let json = JSON.stringify(arr);
        console.log(json);
        weui.toast('提交成功');
    })
};