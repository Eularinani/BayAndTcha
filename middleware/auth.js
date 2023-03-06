const User = require("../models/UsuarioModel");
// The correct value depends maxAge of the cookie (see index.js)
const refreshPer =  1440e3; // 1440e3 milliseconds = 1 hour


// o codigo abaixo é simplismente codigo para verificar 
module.exports.verifyAuth = async function (req, res, next) {
    try {
        //ele aqui esta ver se aquele toke existe 
        let token = req.session.token;
        if (!token) {
            res.status(401).send({ msg: "Please log in." });
            return;
        }
        //ddepois de econtrar ele executa o codigo abaixo verificação se de que pertence o token 
        let result = await User.getUserByToken(token);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
         req.user = result.result;
        // Each time it changes the cookie expiration will be refreshed
        // Smaller number in "refreshPer" means we refresh more times 
        req.session.timestamp =  Math.floor(Date.now() / refreshPer)
        // passing  to next rule
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
} 