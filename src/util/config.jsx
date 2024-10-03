//Tập tin lưu các dữ liệu hằng số hoặc các utility function
export const USER_REGISTER='userRegister';
export const USER_UPDATE='userUpdate';
export const USER_REMOVE='userRemove';
export const USER_LOGIN='userLogin';

export const TOKEN='accessToken';
export const DOMAIN='https://shop.cyberlearn.vn/api/Users/signin'
 const configClient={
    setStoreJson:(name,data)=>{
        let sData=JSON.stringify(data);
        localStorage.setItem(name,sData)
    },
    getStoreJson:(name)=>{
        if (localStorage.getItem(name)){
            let sData=localStorage.getItem(name);
            let data=JSON.parse(sData);
            return data;
        }
        return undefined
    }, setStore:(name,data)=>{//lưu chuỗi
        localStorage.setItem(name,data)
    },
    getStore:(name)=>{//lấy chuỗi
        if (localStorage.getItem(name)){
            return localStorage.getItem(name);
        }
        return undefined
    }, setCookieJson(name,value,days) {
        // biến đổi data thành string
        value=JSON.stringify(value);
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    getCookieJson(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) 
            {return JSON.parse(c.substring(nameEQ.length,c.length))}
        }
        return null;
    },
    deleteCookieJson(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
export const {setStoreJson,getStoreJson,setStore,getStore,getCookieJson,setCookieJson,deleteCookieJson}=configClient;