const fileName = () => {
    const now = new Date();
    return now.toLocaleDateString('vi-VN').replace(/\//g, '-') + ' ' + now.toLocaleTimeString('vi-VN').replace(/:/g, '-');
}
export default fileName