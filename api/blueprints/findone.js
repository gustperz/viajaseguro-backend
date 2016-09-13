/**
 * Created by tav0 on 12/09/16.
 */

const actionUtil = require('./myActionUtil');

module.exports = function findOneRecord (req, res) {

    const Model = actionUtil.parseModel(req);
    const pk = actionUtil.requirePk(req);
    const fields = req.param('fields') ? req.param('fields').replace(/ /g, '').split(',') : false;

    if(fields) {
        const dif = actionUtil.checkFields(fields, Model);
        if (dif.length) {
            return res.badRequest({'error': 'error in fields, ['+dif.toString()+']'});
        }
    }

    var query = fields ? Model.find(pk, {select: fields}) : Model.find(pk);
    query = actionUtil.populateRequest(query, req);
    query.then((matchingRecords) => {
        if(!matchingRecords[0]) return res.notFound('No record found with the specified `id`.');

        if (req._sails.hooks.pubsub && req.isSocket) {
            Model.subscribe(req, matchingRecords[0]);
            actionUtil.subscribeDeep(req, matchingRecords[0]);
        }

        res.ok(matchingRecords[0]);
    }).catch(res.negotiate);

};
