import qs from 'qs' ;

export async function ajaxWithoutParams (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export async function ajaxWithSimpleParams(url,params) {
    let response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(params)
    });
    let data = await response.json();
    return data;
}
export async function ajaxWithComplexParams(url,params) {
    let response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });
    let data = await response.json();
    return data;
}

export async function  ajaxFileUpload(url,params) {
    let response = await fetch(url,{
        method: 'post',
        body: params,
    }) ;
    let data = await response.json();
    return data;
}

export function convertStringToData(dateString) {
    if (dateString !== undefined && dateString !== null && dateString.length > 0) {
        let date = new Date(dateString.replace(/-/,"/"))
        return date;
    }
    return null ;
}

export function convertDataToString(date) {
    if(date === null || date === undefined || date === ''){
        return null ;
    }
    let year = date.getFullYear();//获取完整的年份(4位,1970-????)
    let month = date.getMonth() + 1;//获取当前月份(0-11,0代表1月)
    let day = date.getDate();//获取当前日(1-31)
    if (month < 10) {
        month ="0" + month;
    }
    if (day < 10) {
        day ="0" + day;
    }
    let dateString = year +"/" + month + "/" + day;
    return dateString ;
}