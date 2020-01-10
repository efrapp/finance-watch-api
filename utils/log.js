const fs = require('fs');

function Log() {
  let writable = fs.createWriteStream(`${process.cwd()}/logs/log`, { flags: 'a' });
  const OK = 200;
  const SUCCESS = 'success';
  const FAIL = 'fail';

  writable.on('error', (err) => {
    if (err) process.stdout.write('File not found. A new file was created');

    fs.mkdir(`${process.cwd()}/logs`, { recursive: true }, (mkdirErr) => {
      if (mkdirErr) process.stdout.write('Error creating the file');
    });
    writable = fs.createWriteStream(`${process.cwd()}/logs/log`);
    writable.write('Application log\r\n');
  });

  return Object.assign(this, {
    record(log) {
      const spaces = '    ';
      writable.write(`${log}${spaces}`);
      return this;
    },
    end() {
      writable.write('\r\n');
      return this;
    },
    recordDate() {
      const d = new Date();
      const formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      return this.record(formattedDate);
    },
    recordStatus(statusCode) {
      const message = 'Request status: ';
      if (statusCode === OK) return this.record(`${message} ${SUCCESS}`);

      return this.record(`${message} ${FAIL}`);
    },
  });
}

module.exports = Log;
