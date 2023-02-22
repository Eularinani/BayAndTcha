//index aqui é o local onde podemos encontrar todos os caminhos que daram suporte ao nosso site

const cardsRouter = require("./routes/cardsRoutes");
app.use("/api/cards",cardsRouter);

const usersRouter = require("./routes/usersRoutes");
const cardsRouter = require("./routes/cardsRoutes");

app.use("/api/users",usersRouter);
app.use("/api/cards",cardsRouter);