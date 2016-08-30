"use strict";

module.exports = {

  _config: { actions: false, index: false, rest: false },

  doc: function (req, res) {
    res.status(200).jsonx(sails.hooks.swagger.doc);
  }
};
