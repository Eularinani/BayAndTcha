const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 
            function dbUserToUser(dbUser)  {
                let user = new User();
                user.id = dbUser.usr_id;
                user.name = dbUser.usr_name;
                user.email = dbUser.user_email ;
                user.oferta = dbUser.user_oferta_id;
                user.transacao = dbUser.user_transacao_id;
                return user;
            }
         /* function cardFromDB(dbObj) {
            return new Card(dbObj.crd_id,dbObj.crd_name, 
                dbObj.crd_img_url, dbObj.crd_lore, dbObj.crd_description,
                dbObj.crd_level, dbObj.crd_cost, dbObj.crd_timeout,
                dbObj.crd_max_usage, dbObj.crd_type);    
          }*/
          class usuario {
            constructor(id, name, pass, token,email,oferta,transacao) {
                this.id = id;
                this.name = name;
                this.pass = pass;
                this.email = email;
                this.oferta = oferta;
                this.transacao = transacao;
                this.token = token;
            }
            export() {
                let user=new User();
                user.name = this.name;
                user.email = this.email;
                return user; 
            }

            static async getById(id) {
                try {
                    let dbResult = await pool.query("Select * from appuser where usr_id=$1", [id]);
                    let dbUsers = dbResult.rows;
                    if (!dbUsers.length) 
                        return { status: 404, result:{msg: "No user found for that id."} } ;
                    let dbUser = dbUsers[0];
                    return { status: 200, result: 
                        new User(dbUser.usr_id,dbUser.usr_name,dbUser.user_email,dbUser.user_oferta_id,dbUser.user_transacao_id)} ;
                } catch (err) {
                    console.log(err);
                    return { status: 500, result: err };
                }  
            }

            //registo
    static async register(user) {
        try {
            let dbResult =
                await pool.query("Select * from appuser where usr_email=$1", [user.email]);
            let dbUsers = dbResult.rows;
            if (dbUsers.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "email",
                        msg: "That name already exists"
                    }]
                };
            let encpass = await bcrypt.hash(user.pass,saltRounds);   
            dbResult = await pool.query(`Insert into appuser (user_email, user_pass)
                       values ($1,$2)`, [user.name, encpass]);
            return { status: 200, result: {msg:"Registered! You can now log in."}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }



    static async checkLogin(user) {
        try {
            let dbResult =
                await pool.query("Select * from appuser where user_email=$1", [user.email]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length)
                return { status: 401, result: { msg: "Wrong username or password!"}};
            let dbUser = dbUsers[0]; 
            let isPass = await bcrypt.compare(user.pass,dbUser.user_pass);
            if (!isPass) 
                return { status: 401, result: { msg: "Wrong username or password!"}};
           
            return { status: 200, result: dbUserToUser(dbUser) } ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
          
              static async getAll() {
                  try {
                      let result = [];
                      let dbres = await pool.query("Select * from usuario");
                      let dbCards = dbres.rows;
                      for(let dbCard of dbCards ){
                        result.push(cardFromDB(dbCard));
                      }
                      return {status: 200, result: result};
                  } catch (err) {
                      console.log(err);
                      return {status: 500, result: err };
                  }
              }

 // No verifications. Only to use internally
 static async saveToken(user) {
    try {
        let dbResult =
            await pool.query(`Update appuser set user_token=$1 where user_id = $2`,
            [user.token,user.id]);
        return { status: 200, result: {msg:"Token saved!"}} ;
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}

static async getUserByToken(token) {
    try {
        let dbResult =
            await pool.query(`Select * from appuser where user_token = $1`,[token]);
        let dbUsers = dbResult.rows;
        if (!dbUsers.length)
            return { status: 403, result: {msg:"Invalid authentication!"}} ;
        let user = dbUserToUser(dbUsers[0]);
        return { status: 200, result: user} ;
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}

          }
          
          module.exports = usuario;