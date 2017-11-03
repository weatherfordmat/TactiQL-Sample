const Koa = require('koa');
const mount = require('koa-mount');
const path = require('path');

let { KoaGQL, OnServerStart } = require('tactiql');
let { error, success, describe } = require('tactiql/lib/utils/log');

// constants;
const PORT = process.env.PORT || 3000;
const imagePath = path.join(__dirname, './public/logo.png');

const app = new Koa();

/**
 * This will have no effect if logging is turned off;
 */
app.use((ctx, next) => {
    const start = Date.now();
    return next()
        .then(_ => {
            const ms = Date.now() - start;
            describe(`${ctx.method} ${ctx.url} - ${ms}ms`);
        })
        .catch(err => {
            error(err);
        })
});

app.use(mount(
        '/graphql', 
        KoaGQL('./schema/schema.graphql')
));

app.listen(PORT, () => {
    success(`App listening on port ${PORT}`);
    OnServerStart(imagePath, PORT);
});