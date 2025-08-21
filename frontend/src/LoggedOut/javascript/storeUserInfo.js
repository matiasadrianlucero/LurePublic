export default async function storeUserInfo(username,loginToken,avatar,rememberMe){
    // if(rememberMe){
    //     Date.prototype.addDays = function(days) {
    //     var date = new Date(this.valueOf());
    //     date.setDate(date.getDate() + days);
    //         return date;
    //     }
    //     var date = new Date();

    //     let expiration = date.addDays(365);
    //     expiration = expiration.toUTCString();
    //     document.cookie = encodeURIComponent("token") + '=' + encodeURIComponent(loginToken) + "; HttpOnly; SameSite=none  path=/; expires=" + expiration
    // } else {
    //     document.cookie = encodeURIComponent("token") + '=' + encodeURIComponent(loginToken) + "; path=/"
    // }
    localStorage.setItem("token",loginToken)
    localStorage.setItem("username",username)
    localStorage.setItem("avatar",avatar)

}