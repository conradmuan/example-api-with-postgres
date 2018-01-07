if (!process.argv[2] || !process.argv[3]) {
  process.exit(1);
}
const fs = require('fs');
const path = require('path');
const type = process.argv[2] === 'migrate' ? '.' : process.argv[2];
let filename = process.argv[3];

const filename_normalized = `${Date.now()}_${filename.toLocaleLowerCase().split(' ').join('_')}.js`;
const migration_path = path.join(__dirname, '..', 'migrations', type, filename_normalized);

try {
  fs.closeSync(fs.openSync(migration_path, 'w'));
  console.log(`Migration ${migration_path} created`);
  process.exit();
} catch(err) {
  console.error(err);
  process.exit(1);
}