interface urlData {
    [key: string]: any;
}
const getUrlData = (urlStr: string) => {
    let param: object = {}
    if (!urlStr || 'string' !== typeof urlStr) {
        return param;
    }
    let strArr: Array<string> = urlStr.split("?")
    let str: string | number
    if (strArr && strArr.length > 1) {
        str = strArr[1]
    } else {
        return {}
    }
    if (str) {
        strArr = str.split("&")
    }
    let returnParma: urlData = {}
    for (let index = 0; index < strArr.length; index++) {
        const obj: Array<string> = strArr[index].split('=')
        const key: string = obj[0]
        const value: string = obj[1]
        returnParma[key] = value;
    }
    return param
}
const toFixed = (num: number) => {
    let s = num.toString();
    if (!num) num = 0;
    if (s.indexOf(".") == -1) s += ".";
    s += new Array(num + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (num + 1) + "})?)\\d*$").test(s)) {
        s = "0" + RegExp.$2
        let pm = RegExp.$1,
            a: any = RegExp.$3.length,
            b: Boolean = true;
        if (a == num + 2) {
            a = s.match(/\d/g);
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    } else break;
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
        }
        if (b) s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
    }
    return s
}
export {
    getUrlData, toFixed
}

