$(function () {
    initEvent();
    $('#showTooltips').on('click', function(){
        let form_data = getFormData();
        console.log(form_data);
        try {
            $.ajax({
                timeout:1800000,
                type: 'POST',
                url: '/***',
                // post payload:
                data: JSON.stringify(form_data),
                contentType: 'application/json',
                beforeSend:function(){
                    weui.loading("数据加载中");
                },
                complete:function(){
                    $('.weui-toast').fadeOut();
                },
                success:function (res) {
                    console.log(res);
                },
                error:function (err) {
                    console.log(err);
                }
            })
        }catch (e) {
            console.log(e);
        }
        //weui.toast('已完成');
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
        $('#showPickerWhetherD').text('二甲双胍');
        $('#showPickerWhetherD').parent('div').removeClass('hidden');
    }else if (man_disease == 1){
        $('.sugar').each(function () {
            $(this).removeClass('hidden');
        });
        $('.high').each(function () {
            $(this).addClass('hidden');
        });
        $('#showPickerWhether').prev().text('是否伴有糖尿病 高血脂');
        $('#showPickerWhetherD').text('卡托普利');
        $('#showPickerWhetherD').parent('div').removeClass('hidden');
    }else {
        $('.sugar').each(function () {
            $(this).addClass('hidden');
        });
        $('#showPickerWhetherD').parent('div').addClass('hidden');
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
            },
            title: '多列选择器'
        })
    });
    $('#showPickerWhetherD').on('click',function () {
        let data;
        if ($('#showPicker').attr('value') == 0){
            data = [{label:"二甲双胍",value:0},{label:"格列美脲",value:1},{label:"瑞格列奈",value:2}];
        }else if ($('#showPicker').attr('value') == 1){
            data = [{label:"卡托普利",value:0},{label:"吲达帕胺",value:1},{label:"尼莫地平",value:2}];
        }else {
            data = [];
        }
        weui.picker(data,{
            onChange: function (result) {
                //console.log(result);
            },
            onConfirm: function (result) {
                let value = result[0].label;
                $('#showPickerWhetherD').text(value);
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
        person_type:$('#showPicker').text(),
        sex:$('#showPickerSex').text(),
        age:$('#js_input2').text(),
        address:$('#js_input3').text(),
        phy_cycle:$('#showPickerBody').text(),
        time:$('#showDatePicker').find('.weui-cell__ft').text(),
        is_high:$('#showPickerWhether').text() == '是'?true:false,
        is_insulin:$('#showPickerWhetherT').text() == '是'?true:false,
        is_medicine:$('#showPickerWhetherF').text() == '是'?true:false,
        is_eat_medicine:$('#showPickerWhetherD').text()
    }
    return obj;
}