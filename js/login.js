$(function () {
    initEvent();
    $('#showTooltips').on('click', function(){
        let form_data = getFormData();
        //console.log(JSON.stringify(form_data));
        try {
            $.ajax({
                timeout:1800000,
                type: 'POST',
                url: '/gateway/dynamic/restapi/register',
                // post payload:
                data: JSON.stringify(form_data),
                contentType: 'application/json',
                success:function (res) {
                    if (res.status.code == 500){
                        let msg = res.status.msg;
                        if (msg != ''){
                            $('#toast').find('.weui-toast__content').text(msg);
                            $('#toast').fadeIn(100);
                            setTimeout(function () {
                                $('#toast').fadeOut(100);
                            }, 2000);
                        }
                    }
                    if (res.status.code == 200){
                        window.location.href = 'review.html';
                    }
                },
                error:function (err) {
                    if (err.status == 500){
                        $('#toast').find('.weui-toast__content').text('服务异常');
                        $('#toast').fadeIn(100);
                        setTimeout(function () {
                            $('#toast').fadeOut(100);
                        }, 2000);
                    }
                }
            })
        }catch (e) {
            console.log(e);
        }
    });
})
/**
 *  @desc 疾病类型逻辑样式判断
 * @param man_disease (0,1,2)
 */
function disease_judgment(man_disease,result) {
    if (man_disease === 0 || man_disease === 1){
        $('#showDatePicker').removeClass('hidden');
    }else {
        $('#showDatePicker').addClass('hidden');
    }
    $('#showPicker').text(result[0].label);
    $('#showPicker').attr('value',result[0].value);
    if (man_disease == 0){
        $('.sugar').each(function () {
            $(this).removeClass('hidden');
        });
        $('#showPickerWhether').prev().text('是否伴有高血压 高血脂');
        $('#s11_text').text('二甲双胍');
        $('#s12_text').text('格列美脲');
        $('#s13_text').text('瑞格列奈');
        $('#showPickerWhetherD').removeClass('hidden');
    }else if (man_disease == 1){
        $('.sugar').each(function () {
            $(this).removeClass('hidden');
        });
        $('.high').each(function () {
            $(this).addClass('hidden');
        });
        $('#showPickerWhether').prev().text('是否伴有糖尿病 高血脂');
        $('#s11_text').text('卡托普利');
        $('#s12_text').text('吲达帕胺');
        $('#s13_text').text('尼莫地平');
        $('#showPickerWhetherD').removeClass('hidden');
    }else {
        $('.sugar').each(function () {
            $(this).addClass('hidden');
        });
        $('#showPickerWhetherD').addClass('hidden');
    }
}

/**
 * @desc 事件初始化
 */
function initEvent() {
    $('#showPicker').on('click', function () {
        weui.picker([{
            label: '糖尿病人',
            value: 0
        }, {
            label: '高血压病人',
            value: 1
        }, {
            label: '普通人',
            value: 2
        }], {
            onChange: function (result) {
                //console.log(result);
            },
            onConfirm: function (result) {
                let man_disease = result[0].value;
                disease_judgment(man_disease,result);
            },
            title: '单列选择器'
        });
    });
    $('#showPickerSex').on('click', function () {
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onChange: function (result) {
                //console.log(result);
            },
            onConfirm: function (result) {
                $('#showPickerSex').text(result[0].label);
                $('#showPickerSex').attr('value',result[0].value);
            },
            title: '单列选择器'
        });
    });
    $('#showPickerBody').on('click',function (e) {
        weui.picker([
                {
                    label:'3个月',
                    value:0
                },
                {
                    label:'6个月',
                    value:1
                },
                {
                    label:'1年',
                    value:2
                },
                {
                    label:'1年以上',
                    value:3
                },
                {
                    label:'从不体检',
                    value:4
                }
            ],
            {
                onChange: function (result) {
                    //console.log(result);
                },
                onConfirm: function (result) {
                    $('#showPickerBody').text(result[0].label);
                    $('#showPickerBody').attr('value',result[0].value);
                },
                title: '单列选择器'
            }
        )
    });
    $('#showDatePicker').on('click', function () {
        weui.datePicker({
            start: 1990,
            end: new Date().getFullYear(),
            onChange: function (result) {
                //console.log(result);
            },
            onConfirm: function (result) {
                if (result[1].value < 10){
                    result[1].value = '0'+ result[1].value;
                }
                let value = result[0].value + '-' + result[1].value + '-' + result[2].value;
                $('#showDatePicker').find('.weui-cell__ft').text(value);
            },
            title: '多列选择器'
        })
    });
    $('#showPickerWhether').on('click',function () {
        weui.picker([{label:"是",value:0},{label:"否",value:1}],{
            onChange: function (result) {
                //console.log(result);
            },
            onConfirm: function (result) {
                let value = result[0].label;
                $('#showPickerWhether').text(value);
                $('#showPickerWhether').attr('value',result[0].value);
            },
            title: '多列选择器'
        })
    });
    $('#showPickerWhetherT').on('click',function () {
        weui.picker([{label:"是",value:0},{label:"否",value:1}],{
            onChange: function (result) {
                //console.log(result);
            },
            onConfirm: function (result) {
                let value = result[0].label;
                $('#showPickerWhetherT').text(value);
                $('#showPickerWhetherT').attr('value',result[0].value);
            },
            title: '多列选择器'
        })
    });
    $('#showPickerWhetherF').on('click',function () {
        weui.picker([{label:"是",value:0},{label:"否",value:1}],{
            onChange: function (result) {
                //console.log(result);
            },
            onConfirm: function (result) {
                let value = result[0].label;
                $('#showPickerWhetherF').text(value);
                $('#showPickerWhetherF').attr('value',result[0].value);
            },
            title: '多列选择器'
        })
    });
}

/**
 * @desc 获取form数据
 * @return {{is_high: boolean, address: *, person_type: *, sex: *, time: *, phy_cycle: *, is_eat_medicine: *, age: *, is_insulin: boolean, is_medicine: boolean}}
 */
function getFormData() {
    let obj = {
    	userName:$('#js_input_name').val(),
        person_type:$('#showPicker').attr('value'),
        gender:$('#showPickerSex').attr('value'),
        age:$('#js_input2').val(),
        address:$('#js_input3').val(),
        cycleDetection:$('#showPickerBody').attr('value'),
        diagnoseDate:$('#showDatePicker').find('.weui-cell__ft').text(),
        hypertension1:$('#showPickerWhether').text() == '是'?"1":"0",
        diabetes2:$('#showPickerWhetherT').text() == '是'?"1":"0",
        diabetes3:$('#showPickerWhetherF').text() == '是'?"1":"0",
        is_eat_medicine:[$('#s11').prop('checked'),$('#s12').prop('checked'),$('#s13').prop('checked')]
    }
    return obj;
}