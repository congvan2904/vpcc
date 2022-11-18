const fs = require('fs')
var todayDate = new Date().toISOString().slice(0, 10).split('-').reverse().join('-');
const path = `../logs/${todayDate}.log`
console.log(todayDate);
fs.access(path, fs.F_OK, (err) => {
    if (err) {
        fs.appendFile(path, 'Hello content!', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    } else {
        fs.appendFile(path, '\nHello content! Quay len thoi', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
})