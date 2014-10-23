'use strict';

module.exports = {

  /**
   * List AFINN
   * @param  {Object} req  Request
   * @param  {Object} res  Response
   */
  index: function(req, res) {
    res.json(require('../../../../data/afinn.json'));
  }

};
