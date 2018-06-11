'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('../models/user');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userHandler = function () {
  function userHandler() {
    _classCallCheck(this, userHandler);
  }

  _createClass(userHandler, null, [{
    key: 'signupUser',
    value: function signupUser(req, res) {
      var userInfo = {
        id: _user.users.length += 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password1,
        username: req.body.username
      };
      _user.users.push(userInfo);
      // logic is crazy but i find out when i view the array, the second to the last item is always an empty item so I'm removin it
      _user.users.splice(_user.users.length - 2, 1);
      return res.status(201).send({ msg: userInfo });
    }
  }, {
    key: 'loginUser',
    value: function loginUser(req, res) {
      var user = _user.users.find(function (item) {
        return req.body.email === item.email && req.body.password === item.password;
      });
      if (user) return res.status(200).send({ msg: user.name + ' logged in' });
      return res.status(401).send({ error: 'wrong email or password entered' });
    }
  }]);

  return userHandler;
}();

exports.default = userHandler;
//# sourceMappingURL=userController.js.map