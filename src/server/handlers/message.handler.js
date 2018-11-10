'use strict';

exports.ok = function(msg){
    return { ok: true, result: msg }
}

exports.error = function(err){
    return { ok: false, error: err }
}