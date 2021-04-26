const connection = require("../sequelize/sequelize");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const sgmsg = require("@sendgrid/mail");
const User = require("../models/user");
const Role = require("../models/role");
const Shop = require("../models/shop");
const { update } = require("../models/role");

User.belongsTo(Role, {
  as: "role",
  foreignKey: "roleId",
});
User.hasMany(Shop, { as: "shops", foreignKey: "ownerId" });

exports._signup = async (req, res, next) => {
  console.log(req.body);
  connection.sync();
  await User.findOne({ where: { email: req.body.email } }).then((email) => {
    if (email) {
      res.status(409).json({
        message: "email is exist",
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          Role.findByPk(req.body.roleId).then(async (role) => {
            if (role) {
              User.create({
                name: req.body.name,
                email: req.body.email,
                phoneNum: req.body.phoneNum,

                address: req.body.address,
                imageUrl: req.file.path,

                password: hash,

                payment: req.body.payment,
                gender: req.body.gender,
                birthday: req.body.bithday,

                isActive: false,
                roleId: req.body.roleId,
                roleName: await role.roleName,
              })
                .then(async (data) => {
                  sgmsg.setApiKey(
                    "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"
                  );
                  const msg = {
                    to: req.body.email, // Change to your recipient
                    from: "kareemrabea524@gmail.com", // Change to your verified sender
                    subject: "email confirmation",
                    text: "dear user please confirm",
                    html: `

                    <a href="http://${req.headers.host}/user/confirm_email?userId=${data.userId}">click here to confirm your email</a>
                    `,
                  };

                  await sgmsg
                    .send(msg)
                    .then(() => {
                      res.status(200).json({
                        message: "mail sent to " + req.body.email,
                      });
                    })
                    .catch((err) => {
                      res.status(500).json({
                        message: "send faild",
                        err,
                      });
                    });
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,
                  });
                  console.log(err);
                });
            } else {
              res.status(404).json({
                message: "role not found",
              });
            }
          });
        }
      });
    }
  });
};

exports._login = async (req, res, next) => {
  connection.sync();
  console.log(req.body.email);
  await User.findOne({ where: { email: req.body.email } })
    .then((target) => {
      if (!target) {
        res.status(401).json({
          message: "email not found",
        });
      } else {
        if (target.isActive == false) {
          res.status(404).json({
            message: "email not active",
          });
        } else {
          bcrypt.compare(
            req.body.password,
            target.password,
            function (err, result) {
              if (!result) {
                res.status(401).send({
                  message: "auth failed",
                });
              }

              if (result) {
                if (target.isActive == false) {
                  res.status(500).json({
                    message: "please activate your account",
                  });
                } else {
                  Role.findOne({ where: { roleId: target.roleId } })
                    .then((roles) => {
                      const token = JWT.sign(
                        {
                          email: target.email,
                          userId: target.userId,
                          role: roles.roleName,
                          isActive: target.isActive,
                        },
                        process.env.JWT_TOKEN,
                        {
                          expiresIn: "7d",
                        }
                      );
                      res.status(200).send({
                        message: "auth success",
                        token: token,

                        userdata: target,
                      });
                    })
                    .catch((err) => {
                      res.status(404).json({
                        message: "role not found",
                      });
                    });
                }
              }
            }
          );
        }
      }
    })
    .catch((err2) => {
      res.status(500).json({
        error: err2,
        message: "lmlkm",
      });
    });
};

exports._edit_profile = async (req, res, next) => {
  connection.sync();

  // get userdata
  await User.findOne({ where: { userId: req.body.userId } })
    .then((olduser) => {
      console.log(olduser);
      if (!olduser) {
        res.status(404).json({
          message: "please sign up ",
        });
      }
      // edit
      if (olduser) {
        // get data in body that will edit
        var updats = {};

        for (var key in req.body) {
          updats[key] = req.body[key];
        }

        // delete pass because I'm NOT handle it until now ----------------------------------------------------------------------------------
        delete updats.password;
        console.log(updats);
        olduser.update(updats);

        res.status(200).json({
          message: "update success",
          user: olduser,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "dfvfdfd",
        err,
      });
    });
};

exports._confirm_email = async (req, res, next) => {
  connection.sync();

  await User.findByPk(req.query.userId)
    .then((user) => {
      user
        .update({
          isActive: true,
        })
        .then((data) => {
          res.status(200).json({
            message: "active success",
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
            message: "con not activate",
          });
        });
      user.save();
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: "con not activate",
      });
    });
};

exports._get_userdata = async (req, res, next) => {
  connection.sync();
  await User.findOne({ where: { userId: req.params.userId } })
    .then((data) => {
      delete data.password;

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
