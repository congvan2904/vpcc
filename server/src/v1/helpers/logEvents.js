const fs = require('fs')
const path = require('path');
const getDate = new Date().toISOString().slice(0, 10).split('-').reverse().join('-')
const getMonth = getDate.slice(3, 10)
const pathLog = `../logs/${getMonth}/${getDate}.log`
const pathMonth = `../logs/${getMonth}`
const joinPath = path.join(__dirname, pathLog)
const joinPathMonth = path.join(__dirname, pathMonth)
// var directories = path.dirname
const logEvents = async (msg) => {
    fs.mkdir(joinPathMonth, (err) => {
        if (err) {
            return;
        }
        console.log('Directory created successfully!');
    })
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