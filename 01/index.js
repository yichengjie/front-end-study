$(function () {
    //$(document).off('.datepicker.data-api');


    //初始化评价日期空间
    $('#content-date-container').datepicker({
        format: 'yyyy-mm-dd',
         startDate: '0d'
    });

    // $(".datepicker").datepicker({
    //     format: 'yyyy-mm-dd',
    //     startDate: '0d'
    // });

    $('select').selectpicker();
})