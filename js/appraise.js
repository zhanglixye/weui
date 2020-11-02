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
        obj.type1 = $('.type1 .cadetblue').attr('value');
        obj.type2 = $('.type2 .cadetblue').attr('value');
        obj.type3 = $('.type3 .cadetblue').attr('value');
        obj.type4 = $('.type4 .cadetblue').attr('value');
        let area_input = $('.input_area').val();
        obj.type5 = area_input;
        let json = JSON.stringify(obj);
        console.log(json);
        weui.toast('提交成功');
    })
};