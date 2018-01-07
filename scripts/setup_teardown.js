if (!process.argv[2]) {
  exit(1);
}

const path = require('path');
const dir = require('node-dir');
const type = process.argv[2];

const ls = dir.files(path.join(__dirname, '..', 'migrations', type), { sync: true }, (err, files) => {
  if (err) throw err;
  return files.sort();
});

ls.forEach(file => {
  require(file);
});
