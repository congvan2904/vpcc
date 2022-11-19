const fs = require('fs')
const path = require('path');
var getDate = new Date().toISOString().slice(0, 10).split('-').reverse().join('-');
const pathLog = `../logs/${getDate}.log`
const joinPath = path.join(__dirname, pathLog)
// var directories = path.dirname
const logEvents = async (msg) => {
    fs.access(pathLog, fs.F_OK, (err) => {
        // if (err) {
        // fs.appendFile(path, `${msg}\n`, function (err) {
        //     if (err) throw err;
        //     console.log('Saved!');
        // })
        // }
        // } else {
        //     fs.appendFile(path, `${msg}\n`, function (err) {
        //         if (err) throw err;
        //         console.log('Saved!');
        //     });
        // }

        fs.appendFile(joinPath, `${msg}\n`, function (error) {
            if (error) throw error;
            console.log('Saved!');
        })
    })
}
module.exports = logEvents