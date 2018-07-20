'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setError = exports.dismissError = undefined;

var _ActionTypes = require('../../../constants/ActionTypes');

var dismissError = exports.dismissError = function dismissError(_ref) {
    var stateKey = _ref.stateKey;
    return {
        type: _ActionTypes.DISMISS_ERROR, stateKey: stateKey
    };
};

var setError = exports.setError = function setError(_ref2) {
    var stateKey = _ref2.stateKey,
        error = _ref2.error;
    return {
        type: _ActionTypes.ERROR_OCCURRED, stateKey: stateKey, error: error
    };
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(dismissError, 'dismissError', 'src/actions/plugins/errorhandler/ErrorHandlerActions.js');

    __REACT_HOT_LOADER__.register(setError, 'setError', 'src/actions/plugins/errorhandler/ErrorHandlerActions.js');
}();

;