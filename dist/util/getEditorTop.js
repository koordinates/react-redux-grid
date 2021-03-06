"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var OFFSET = exports.OFFSET = 7;
var TOP_OFFSET = exports.TOP_OFFSET = 5;

var getEditorTop = exports.getEditorTop = function getEditorTop(rowElement, moveToTop, editorDom) {

    if (!rowElement) {
        return null;
    }

    if (moveToTop) {
        return rowElement.offsetTop - (editorDom.clientHeight - TOP_OFFSET);
    }

    return rowElement.offsetTop + rowElement.clientHeight + OFFSET;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(OFFSET, "OFFSET", "src/util/getEditorTop.js");

    __REACT_HOT_LOADER__.register(TOP_OFFSET, "TOP_OFFSET", "src/util/getEditorTop.js");

    __REACT_HOT_LOADER__.register(getEditorTop, "getEditorTop", "src/util/getEditorTop.js");
}();

;