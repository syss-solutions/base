const mongoose = require('mongoose');
const User = require('../app/model/users');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
    add: (req, res) => {
      res.send('respond with a resource');

      mongoose.connect(dbConn, { useNewUrlParser : true }, (err) => {
        let result = {};
        let status = 201;
        if (!err) {
          const { name, password } = req.body;
          const user = new User({ name, password }); // document = instance of a model
          // TODO: We can hash the password here before we insert instead of in the model
          user.save((err, user) => {
            if (!err) {
              result.status = status;
              result.result = user;
            } else {
              status = 500;
              result.status = status;
              result.error = err;
            }
            res.status(status).send(result);
          });
        } else {
          status = 500;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
        }
      });
    }
}