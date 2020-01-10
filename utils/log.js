const fs = require('fs');

function Log() {
  let writable = fs.createWriteStream(`${process.cwd()}/logs/log`, { flags: 'a' });

  writable.on('error', (err) => {
    if (err) process.stdout.write(err.toString());

    fs.mkdir(`${process.cwd()}/logs`, { recursive: true }, (mkdirErr) => {
      if (mkdirErr) process.stdout.write(mkdirErr.toString());
    });
    writable = fs.createWriteStream(`${process.cwd()}/logs/log`);
    writable.write('Application log');
  });

  return Object.assign(this, {
    record(log) {
      writable.write(log);
      return this;
    },
  });
}

module.exports = Log;
