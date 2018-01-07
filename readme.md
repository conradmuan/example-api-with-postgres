Super simple example of an express app with token based auth, and npm scripts for setting up, tearing down and creating migrations.

- `npm run migration name_of_migration` - creates a migration file in `migrations/timestamp_name_of_imgration.js`
- `npm run migration:setup` - creates a setup script in `migrations/setup/timestamp_create_table.js`
- `npm run migration:teardown` - creates a teardown script in `migrations/setup/timestamp_drop_table.js`
- `npm run setup` - runs all setup migrations
- `npm run teardown` - runs all teardown migrations