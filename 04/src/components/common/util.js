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