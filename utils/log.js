const fs = require('fs');

function Log() {
  let writable = fs.createWriteStream(`${process.cwd()}/logs/log`);

  writable.on('error', (err) => {
    if (err) process.stdout.write(err.toString());

    fs.mkdir(`${process.cwd()}/logs`, { recursive: true }, (mkdirErr) => {
      if (mkdirErr) process.stdout.write(mkdirErr.toString());
    });
    writable = fs.createWriteStream(`${process.cwd()}/logs/log`);
    writable.write('Application log');
  });
}

module.exports = Log;
