const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});