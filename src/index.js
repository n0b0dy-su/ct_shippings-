const sequelize = require('./database.js');
const app = require('./app');

app.listen(3000, () => {
	console.log(`[SERVER LISTENING]: port 3000`);
    sequelize.sync({ force: false }).then(() => {
        console.log('[DB CONNECTED]');
    })
    .catch( err => {
        console.log('[DB CONNECTION ERROR]');
    });
});
