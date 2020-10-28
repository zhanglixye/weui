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
        console.log('提交');
    })
};