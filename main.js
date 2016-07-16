const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const exec = require('child_process').exec;

const app = express();

app.use(cors());

//body parser setup
bodyParser.json();

app.get('/cpu', (req, res) => {
    let arch = os.arch();
    let cpus = os.cpus();
    res.send({arch: arch, cpu: cpus});
});

app.get('/cputemp', (req, res) => {
    exec('cat /sys/class/thermal/thermal_zone0/temp', (error, stdout, stderr) => {
        if (error) {
            console.error(error);
        } else {
            let temp = parseFloat(stdout)/1000;
            res.send({temp: temp});
        }
    });
});

app.get('/mem', (req, res) => {
    let freeMem = os.freemem();
    let totalMem = os.totalmem();
    res.send({freeMem: freeMem, totalMem: totalMem});
});

app.get('/load', (req, res) => {
    let loadAvg = os.loadavg();
    res.send({load: loadAvg});
});

app.get('/systemInfo', (req, res) => {
    let platform = os.platform();
    let version = os.release();
    let type = os.type();
    let hostname = os.hostname();
    res.send({platform: platform, version: version, type: type, hostname: hostname});
});

app.get('/uptime', (req, res) => {
    let uptime = os.uptime();
    res.send({uptime: uptime});
});

app.listen(8080, () => {
    console.log("app listening on port 8080");
});
