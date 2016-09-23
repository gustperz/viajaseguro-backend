/**
 * Created by tav0 on 12/09/16.
 */

const actionUtil = require('./myActionUtil');
const forEach = require('lodash').each;

module.exports = function findRecords (req, res) {

    if ( actionUtil.parsePk(req) ) {
        return require('./findone')(req,res);
    }

    if (req.param('fields') || req.options.nofields) {
        const Model = actionUtil.parseModel(req);

        if (!req.options.nofields) {
            var fields = req.param('fields').replace(/ /g, '').split(',');
            const dif = actionUtil.checkFields(fields, Model);
            if (dif.length) {
                return res.badRequest({'error': 'error in fields, [' + dif.toString() + ']'});
            }
        }

        var query = Model.find(req.param('fields') ? {select: fields} : null)
            .where( actionUtil.parseCriteria(req) )
            .limit( actionUtil.parseLimit(req) )
            .skip( actionUtil.parseSkip(req) )
            .sort( actionUtil.parseSort(req) );
        query = actionUtil.populateRequest(query, req);

        query.then((matchingRecords) => {
            // Only `.watch()` for new instances of the model if
            // `autoWatch` is enabled.
            if (req._sails.hooks.pubsub && req.isSocket) {
                Model.subscribe(req, matchingRecords);
                if (req.options.autoWatch) { Model.watch(req); }
                // Also subscribe to instances of all associated models
                forEach(matchingRecords, function (record) {
                    actionUtil.subscribeDeep(req, record);
                });
            }

            res.ok(matchingRecords);
        }).catch(res.negotiate);
    } else {
        res.badRequest('El parametro fields es obligatorio para esta petición')
    }
};
