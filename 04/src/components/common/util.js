// async function
export async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}