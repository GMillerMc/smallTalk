const server = require('./app')

const port = 3000;

server.listen(process.env.PORT || port, () => console.log(`\nExpress departing now from port 3000!\n`))