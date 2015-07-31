var qs = require('querystring');

exports.tplParse      = require('./lib/parser').tplParse;

exports.Table         = require('./lib/table');
exports.Query         = require('./lib/query');
exports.Parser        = require('./lib/parser');
exports.Merger        = require('./lib/merger');
exports.Adapter       = require('./lib/adapter');
exports.Context       = require('./lib/context');
exports.Executor      = require('./lib/executor');
exports.Extractor     = require('./lib/extractor');
exports.AstHelper     = require('./lib/ast_helper');

exports.AstReader     = require('./lib/ast_helper').Reader;

exports.parse         = function(params) {
  // If a string was passed, parse the querystring into an object
  if(typeof params === 'string') {
    params = qs.parse(params);
  }

  // Construct SQL string to be parsed
  var sql = 'SELECT ' + (params.$select || '*');
  if(params.$where) sql += ' WHERE ' + params.$where;
  if(params.$group) sql += ' GROUP BY ' + params.$group;
  if(params.$order) sql += ' ORDER BY ' + params.$order;
  if(params.$limit) {
    sql += ' LIMIT ' + params.$limit;
    if(params.$offset) sql += ', ' + params.$offset;
  }

  return require('./lib/parser').parse(sql);
};
