export const getIP = networkInterfaces => {
    // Check if user is using WIFI or WIRED internet
    const typeWifi = networkInterfaces.wlp0s20f3;
    const typeWired = networkInterfaces.eth0;
    let ip;
    if(typeWifi) {
        ip = typeWifi[0].address
    }
    else if(typeWired) {
        ip = typeWired[0].address
    }
    return ip;
}