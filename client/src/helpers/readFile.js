const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            resolve(contents.split('\n'));
        };
        reader.onerror = function (e) {
            reject(e);
        };
        reader.readAsText(file);
    });
}
export default readFile