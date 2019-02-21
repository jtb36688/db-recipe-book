// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/rdb.sqlite3'
    },
    useNullAsDefault: true
  }
}
