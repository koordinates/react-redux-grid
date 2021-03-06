'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Grid = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _TableContainer = require('./layout/TableContainer');

var _TableContainer2 = _interopRequireDefault(_TableContainer);

var _FixedHeader = require('./layout/FixedHeader');

var _FixedHeader2 = _interopRequireDefault(_FixedHeader);

var _Pager = require('./plugins/pager/Pager');

var _Pager2 = _interopRequireDefault(_Pager);

var _Message = require('./plugins/errorhandler/Message');

var _Message2 = _interopRequireDefault(_Message);

var _Toolbar = require('./plugins/bulkactions/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _LoadingBar = require('./plugins/loader/LoadingBar');

var _LoadingBar2 = _interopRequireDefault(_LoadingBar);

var _ColumnManager = require('./core/ColumnManager');

var _ColumnManager2 = _interopRequireDefault(_ColumnManager);

var _Model = require('./plugins/selection/Model');

var _Model2 = _interopRequireDefault(_Model);

var _Manager = require('./plugins/editor/Manager');

var _Manager2 = _interopRequireDefault(_Manager);

var _prefix = require('../util/prefix');

var _GridConstants = require('../constants/GridConstants');

var _GridActions = require('../actions/GridActions');

var _mapStateToProps = require('../util/mapStateToProps');

var _shouldComponentUpdate = require('../util/shouldComponentUpdate');

var _isPluginEnabled = require('../util/isPluginEnabled');

var _getColumnsFromStorage = require('../util/getColumnsFromStorage');

var _LocalStorageManager = require('./core/LocalStorageManager');

var _LocalStorageManager2 = _interopRequireDefault(_LocalStorageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = '.react-grid-page-buttons {   background-color: #2e7d32;   border: none;   border-radius: 3px;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1; } .react-grid-page-buttons:focus {   outline: none; } .react-grid-page-buttons:active {   background-color: #52bf57;   opacity: 1; } .react-grid-page-buttons:hover {   opacity: 0.6; } .react-grid-page-buttons:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-cell {   border-bottom: 1px solid #f7f7f7;   box-sizing: border-box;   font-family: \'Open Sans\', sans-serif;   font-size: 13px;   height: 20px;   line-height: 25px;   overflow: hidden;   padding: 0 10px;   position: relative;   text-overflow: ellipsis; } .react-grid-cell.react-grid-edit {   overflow: visible; } .react-grid-cell .react-grid-inactive {   pointer-events: none; } .react-grid-container {   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   position: relative; } .react-grid-table {   border-collapse: collapse;   border-radius: 4px;   font-size: 14px;   position: relative;   table-layout: fixed;   text-align: left;   white-space: nowrap;   width: 100%; } .react-grid-table.react-grid-header-fixed {   box-shadow: none;   z-index: 9; } .react-grid-table.react-grid-header-fixed.react-grid-header-stuck {   margin-left: auto;   margin-right: auto;   position: fixed;   top: 0; } .react-grid-table.react-grid-header-fixed.react-grid-header-stuck-bottom {   position: absolute; } .react-grid-table.react-grid-header-hidden thead, .react-grid-table.react-grid-header-hidden thead * {   border: none;   height: 0; } .react-grid-table.react-grid-header-hidden thead th * {   border: none;   display: none;   height: 0; } .react-grid-table-container {   background-color: #fff;   overflow: hidden;   overflow-x: hidden;   overflow-y: auto;   position: relative;   will-change: transform; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-0 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: -16px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-0::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-0::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-0.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-0.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-0.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-0:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-1 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 0px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-1::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-1::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-1.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-1.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-1.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-1:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-2 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 16px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-2::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-2::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-2.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-2.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-2.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-2:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-3 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 32px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-3::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-3::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-3.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-3.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-3.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-3:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-4 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 48px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-4::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-4::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-4.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-4.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-4.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-4:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-5 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 64px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-5::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-5::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-5.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-5.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-5.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-5:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-6 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 80px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-6::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-6::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-6.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-6.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-6.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-6:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-7 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 96px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-7::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-7::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-7.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-7.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-7.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-7:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-8 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 112px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-8::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-8::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-8.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-8.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-8.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-8:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-9 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 128px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-9::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-9::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-9.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-9.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-9.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-9:not(.react-grid-expand) {   visibility: hidden; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-10 {   cursor: pointer;   padding: 10px 5px 10px 0;   padding-left: 144px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-10::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F078\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-10::before {   font-size: 8px;   left: -5px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-10.react-grid-node-unexpanded {   cursor: pointer; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-10.react-grid-node-unexpanded::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F054\'; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-10.react-grid-node-unexpanded::before {   font-size: 8px;   left: -8px;   margin-right: 2px;   position: relative;   top: -1px; } .react-grid-cell-tree-arrow.react-grid-tree-node-depth-10:not(.react-grid-expand) {   visibility: hidden; } .react-grid-row-is-dragging .react-grid-tree-node-depth-0 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-1 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-2 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-3 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-4 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-5 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-6 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-7 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-8 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-9 .react-grid-row-drag-handle {   color: #fff; } .react-grid-row-is-dragging .react-grid-tree-node-depth-10 .react-grid-row-drag-handle {   color: #fff; } .react-grid-header-fixed-container.react-grid-hidden {   opacity: 0; } .react-grid-header {   background-color: #f7f7f7;   border-bottom: 1px solid #e9e9e9;   color: #3f3f3f;   font-family: \'Open Sans\', sans-serif;   height: 24px; } .react-grid-header.react-grid-header-hidden {   visibility: hidden; } .react-grid-header.react-grid-header-hidden th {   border: none;   height: 0;   padding-bottom: 0;   padding-top: 0; } .react-grid-header.react-grid-header-hidden th.react-grid-checkbox-container {   border: none;   height: 0;   margin: 0; } .react-grid-header th {   position: relative;   text-overflow: ellipsis; } .react-grid-header th.react-grid-checkbox-container {   border-bottom: 1px solid #e9e9e9; } .react-grid-header th.react-grid-checkbox-container.react-grid-hidden .react-grid-checkbox {   visibility: hidden; } .react-grid-header th .react-grid-column {   display: inline-block;   height: 24px;   overflow: hidden;   position: relative;   text-overflow: ellipsis;   top: 6px;   width: 80%; } .react-grid-header th.react-grid-sort-handle-visible .react-grid-sort-handle {   visibility: visible; } .react-grid-header th .react-grid-sort-handle {   float: left;   transition-duration: 150ms;   transition-property: opacity;   transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   visibility: hidden; } .react-grid-header th .react-grid-sort-handle.react-grid-desc {   cursor: pointer; } .react-grid-header th .react-grid-sort-handle.react-grid-desc::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F0D8\'; } .react-grid-header th .react-grid-sort-handle.react-grid-desc::before {   top: -1px; } .react-grid-header th .react-grid-sort-handle.react-grid-asc {   cursor: pointer; } .react-grid-header th .react-grid-sort-handle.react-grid-asc::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F0D7\'; } .react-grid-header th .react-grid-sort-handle.react-grid-asc::before {   cursor: pointer;   position: relative;   right: 1px; } .react-grid-header th .react-grid-drag-handle::after {   border-right: 1px solid #f7f7f7;   content: \' \';   cursor: ew-resize;   height: 100%;   position: absolute;   right: 0;   top: 0;   transition-duration: 150ms;   transition-property: border;   transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   width: 10px; } .react-grid-header th:hover .react-grid-drag-handle::after {   border-color: #e9e9e9; } .react-grid-header th:nth-last-child(1), .react-grid-header th:nth-last-child(2) {   overflow: initial; } .react-grid-header th:nth-last-child(1) .react-grid-drag-handle::after, .react-grid-header th:nth-last-child(2) .react-grid-drag-handle::after {   border: none;   cursor: auto; } .react-grid-action-menu-container {   background-color: #fff;   border-radius: 3px;   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   list-style-position: outside;   list-style-type: none;   min-height: 30px;   overflow: auto;   overflow-x: hidden;   padding: 0;   position: absolute;   right: 6px;   top: 10px;   z-index: 11; } .react-grid-top .react-grid-action-menu-container {   bottom: 3px;   top: initial; } .react-grid-action-menu-item {   border-radius: 3px;   font-family: \'Open Sans\', sans-serif;   font-size: 12px;   line-height: 1.2;   padding: 6px 30px 6px 6px; } .react-grid-action-menu-item:hover {   background-color: #f7f7f7; } .react-grid-row {   background-color: #fff;   box-sizing: border-box;   cursor: pointer;   text-overflow: ellipsis;   transition-duration: 150ms;   transition-property: background-color;   transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); } .react-grid-row:hover {   background-color: #f5f5f5; } .react-grid-row.react-grid-empty-row {   height: 80px;   text-align: center; } .react-grid-row.react-grid-row-is-dragging {   background-color: #28e;   color: #28e; } .react-grid-row.react-grid-active {   background-color: #e9e9e9; } .react-grid-row.react-grid-edit {   background-color: #b2b2b2;   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   color: #fff; } .react-grid-row.react-grid-edit .react-grid-action-menu-container {   color: initial; } .react-grid-row.react-grid-edit .react-grid-action-menu-container:hover {   background-color: #b2b2b2; } .react-grid-row.react-grid-edit .react-grid-action-menu-container td {   border-bottom: 2px solid transparent; } .react-grid-row.react-grid-edit .react-grid-action-menu-container td:focus {   border-bottom: 2px solid #2e7d32;   outline: none; } .react-grid-row-drag-handle {   cursor: move;   cursor: pointer;   margin-right: 20px; } .react-grid-row-drag-handle::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F07D\'; } .react-grid-cell-handle-container {   display: inline-block;   height: 100%;   margin-left: -10px;   padding-left: 10px; } .react-grid-row-is-dragging .react-grid-cell-handle-container {   background-color: #fff; } .react-grid-inline-editor {   left: 0;   margin: 0 auto;   transition-duration: 150ms;   transition-property: -webkit-transform opacity;   transition-property: transform opacity;   transition-property: transform opacity, -webkit-transform opacity;   transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   opacity: 0;   pointer-events: none;   position: absolute;   right: 0;   text-align: center;   -webkit-transform: translateX(0px) translateY(0px);           transform: translateX(0px) translateY(0px); } .react-grid-inline-editor .react-grid-button-container {   background-color: #b2b2b2;   border-radius: 3px;   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   display: inline-block;   margin-top: 5px;   padding: 5px;   pointer-events: all; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button {   background-color: #2e7d32;   border: none;   border-radius: 3px;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button:focus {   outline: none; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button:active {   background-color: #52bf57;   opacity: 1; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button:hover {   opacity: 0.6; } .react-grid-inline-editor .react-grid-button-container .react-grid-save-button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button {   background-color: #f7f7f7;   border: none;   border-radius: 3px;   color: #161616;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button:focus {   outline: none; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button:active {   background-color: #f9f9f9;   opacity: 1; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button:hover {   opacity: 0.6; } .react-grid-inline-editor .react-grid-button-container .react-grid-cancel-button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-shown {   display: block;   opacity: 1;   -webkit-transform: translateY(-7px);           transform: translateY(-7px); } .react-grid-hidden {   top: -10000px; } .react-grid-error-container {   background-color: #f7f7f7;   bottom: 0;   box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   color: #e9e9e9;   height: 100px;   left: 0;   margin: auto;   opacity: 0;   -webkit-perspective: 1300px;           perspective: 1300px;   position: absolute;   right: 0;   top: -10000px;   -webkit-transform: rotateX(-70deg);           transform: rotateX(-70deg);   -webkit-transform-style: preserve-3d;           transform-style: preserve-3d;   transition-duration: 0.2s;   transition-property: -webkit-transform;   transition-property: transform;   transition-property: transform, -webkit-transform;   transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   width: 50%;   z-index: 10; } .react-grid-error-container.react-grid-shown {   opacity: 1;   top: 0;   -webkit-transform: rotateX(0deg);           transform: rotateX(0deg); } .react-grid-error-container.react-grid-shown .react-grid-error-message {   color: #3f3f3f;   font-family: \'Open Sans\', sans-serif;   height: 20px;   left: 0;   margin-top: -20px;   margin-left: 20px;   position: absolute;   right: 0;   top: 50%; } .react-grid-error-container.react-grid-shown button {   bottom: 10px;   background-color: #2e7d32;   border: none;   border-radius: 3px;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1;   position: absolute;   right: 10px; } .react-grid-error-container.react-grid-shown button:focus {   outline: none; } .react-grid-error-container.react-grid-shown button:active {   background-color: #52bf57;   opacity: 1; } .react-grid-error-container.react-grid-shown button:hover {   opacity: 0.6; } .react-grid-error-container.react-grid-shown button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } th.react-grid-action-container {   border-bottom: 1px solid #e9e9e9; } .react-grid-action-container {   border-bottom: 1px solid #f7f7f7;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   height: 20px;   position: relative;   width: 5px; } .react-grid-action-container .react-grid-no-actions {   display: none; } .react-grid-action-container .react-grid-action-icon {   cursor: pointer;   cursor: pointer;   padding-left: 5px;   position: relative; } .react-grid-action-container .react-grid-action-icon::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F142\'; } .react-grid-action-container .react-grid-action-icon::before {   border-radius: 3px;   cursor: pointer;   position: absolute;   right: 5px;   text-align: center;   top: 5px;   width: 6px; } .react-grid-action-container.react-grid-action-menu-selected span::before {   background-color: #e9e9e9; } .react-grid-loading-bar {   display: none;   height: 4px;   position: absolute;   width: 100%; } .react-grid-loading-bar.react-grid-active {   display: block; } .react-grid-loading-bar::before {   -webkit-animation: loading 2s linear infinite;           animation: loading 2s linear infinite;   background-color: #2e7d32;   content: \'\';   display: block;   height: 4px;   left: -200px;   position: absolute;   width: 200px; } @-webkit-keyframes loading {   from {     left: 0px;     width: 30%;   }   50% {     width: 30%;   }   70% {     width: 44%;   }   80% {     left: 55%;   }   95% {     left: 66%;   }   to {     left: 72%;   } } @keyframes loading {   from {     left: 0px;     width: 30%;   }   50% {     width: 30%;   }   70% {     width: 44%;   }   80% {     left: 55%;   }   95% {     left: 66%;   }   to {     left: 72%;   } } .react-grid-pager-toolbar {   background-color: #f7f7f7;   border-radius: 0 0 3px 3px;   border-top: 1px solid #e9e9e9;   font-family: \'Open Sans\', sans-serif;   font-size: 13px;   height: 24px;   text-indent: 10px; } .react-grid-pager-toolbar.react-grid-is-stuck {   bottom: 0;   position: fixed; } .react-grid-pager-toolbar.react-grid-is-stuck-bottom {   position: absolute;   width: 100%; } .react-grid-pager-toolbar span {   display: block;   float: right;   position: relative;   right: 5px;   top: 2px; } .react-grid-pager-toolbar span:first-child {   float: left;   font-family: \'Open Sans\', sans-serif;   font-size: 14px; } .react-grid-pager-toolbar button {   margin: 0 10px; } .react-grid-checkbox-container {   border-bottom: 1px solid #f7f7f7;   font-family: \'Open Sans\', sans-serif;   font-size: 13px;   height: 20px;   overflow: hidden;   padding: 0 10px;   position: relative;   text-overflow: ellipsis;   width: 10px; } .react-grid-bulkaction-container {   background-color: #b2b2b2;   border-radius: 3px 3px 0 0;   height: 28px;   transition-duration: 150ms;   transition-property: -webkit-transform opacity top;   transition-property: transform opacity top;   transition-property: transform opacity top, -webkit-transform opacity top;   transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   opacity: 0;   position: absolute;   text-align: left;   top: -37px;   -webkit-transform: translateX(0px) translateY(-37px);           transform: translateX(0px) translateY(-37px);   width: 100%;   z-index: 12; } .react-grid-bulkaction-container .react-grid-bulkaction-description {   display: inline-block;   font-family: \'Open Sans\', sans-serif;   font-size: 13px;   min-width: 70px;   overflow: hidden;   padding-left: 15px;   position: relative;   text-overflow: ellipsis;   top: 3px; } .react-grid-bulkaction-container .react-grid-bulkaction-description .react-grid-checkbox-container {   border-bottom: 1px solid transparent; } .react-grid-bulkaction-container .react-grid-bulkaction-description button {   background-color: #2e7d32;   border: none;   border-radius: 3px;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1;   margin: 5px 8px;   position: relative;   top: -1px; } .react-grid-bulkaction-container .react-grid-bulkaction-description button:focus {   outline: none; } .react-grid-bulkaction-container .react-grid-bulkaction-description button:active {   background-color: #52bf57;   opacity: 1; } .react-grid-bulkaction-container .react-grid-bulkaction-description button:hover {   opacity: 0.6; } .react-grid-bulkaction-container .react-grid-bulkaction-description button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-bulkaction-container .react-grid-bulkaction-description.react-grid-removed {   top: -100px; } .react-grid-bulkaction-container .react-grid-bulkaction-description.react-grid-shown {   opacity: 1;   top: 0;   -webkit-transform: translateY(0px);           transform: translateY(0px); } .react-grid-filter-container {   background-color: #f7f7f7;   border-radius: 3px 3px 0 0;   padding: 5px 0;   position: relative;   text-align: center;   width: 100%; } .react-grid-filter-container .react-grid-filter-input {   border: 1px solid #e9e9e9;   border-radius: 3px;   color: #b2b2b2;   display: inline-block;   font-family: \'Open Sans\', sans-serif;   font-size: 14px;   padding: 0;   text-indent: 5px;   transition-duration: 150ms;   transition-property: color;   transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   width: 99%; } .react-grid-filter-container .react-grid-filter-input:focus {   color: #8e8e8e;   outline: none; } .react-grid-filter-container:hover .react-grid-filter-input {   color: #8e8e8e; } .react-grid-filter-container .react-grid-filter-button-container {   display: inline-block;   position: absolute;   right: 5px; } .react-grid-filter-container .react-grid-filter-button-container > i {   padding: 0 3px 0 0; } .react-grid-filter-container .react-grid-filter-button-container > i::before {   color: #b2b2b2;   transition-duration: 150ms;   transition-property: color;   transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67); } .react-grid-filter-container .react-grid-filter-button-container > i:hover::before {   color: #8e8e8e; } .react-grid-filter-container .react-grid-filter-button-container > i.react-grid-active::before {   color: #2e7d32; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-search-button {   cursor: pointer; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-search-button::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F002\'; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-clear-button {   cursor: pointer; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-clear-button::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F00D\'; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-menu-button {   cursor: pointer; } .react-grid-filter-container .react-grid-filter-button-container .react-grid-filter-menu-button::before {   font-family: FontAwesome;   font-size: 12px;   font-style: normal;   font-weight: normal;   content: \'\\F0b0\'; } .react-grid-advanced-filter-menu-container {   background-color: #f7f7f7;   border-radius: 3px;   box-shadow: 10px 15px 30px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);   font-family: \'Open Sans\', sans-serif;   position: absolute;   right: 10px;   top: 24px;   width: 400px;   z-index: 13; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-title {   display: inline-block;   padding: 5px 10px; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-field-container {   display: block;   font-size: 13px;   margin: 0 auto;   padding: 5px 0;   text-align: left;   width: 90%; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-field-container .react-grid-advanced-filter-menu-field-label {   display: inline-block;   padding: 5px 0; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-field-container .react-grid-advanced-filter-menu-field-input {   border: 1px solid #e9e9e9;   border-radius: 3px;   color: #b2b2b2;   display: inline-block;   font-family: \'Open Sans\', sans-serif;   font-size: 14px;   padding: 0;   text-indent: 5px;   transition-duration: 150ms;   transition-property: color;   transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);   width: 100%; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-field-container .react-grid-advanced-filter-menu-field-input:focus {   color: #8e8e8e;   outline: none; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container {   margin: 0 auto;   padding: 10px;   text-align: left;   width: 90%; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button {   background-color: #2e7d32;   border: none;   border-radius: 3px;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1;   margin-right: 5px; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button:focus {   outline: none; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button:active {   background-color: #52bf57;   opacity: 1; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button:hover {   opacity: 0.6; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary {   background-color: #fff;   border: none;   border-radius: 3px;   color: #fff;   cursor: pointer;   font-family: \'Open Sans\', sans-serif;   opacity: 1;   color: #161616; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary:focus {   outline: none; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary:active {   background-color: #fff;   opacity: 1; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary:hover {   opacity: 0.6; } .react-grid-advanced-filter-menu-container .react-grid-advanced-filter-menu-button-container .react-grid-advanced-filter-menu-button.react-grid-secondary:disabled {   background-color: #fff;   color: #161616;   cursor: initial; } ';
var any = _propTypes2.default.any,
    array = _propTypes2.default.array,
    arrayOf = _propTypes2.default.arrayOf,
    bool = _propTypes2.default.bool,
    object = _propTypes2.default.object,
    oneOf = _propTypes2.default.oneOf,
    oneOfType = _propTypes2.default.oneOfType,
    number = _propTypes2.default.number,
    string = _propTypes2.default.string;

var Grid = exports.Grid = function (_Component) {
    _inherits(Grid, _Component);

    _createClass(Grid, [{
        key: 'render',
        value: function render() {
            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES,
                USE_GRID_STYLES = _gridConfig.USE_GRID_STYLES;

            var editorComponent = this.getEditor();
            var isLoading = this.isLoading();
            var store = this.getStore();

            if (!this.CSS_LOADED && USE_GRID_STYLES) {
                this.CSS_LOADED = true;
                this.addStyles();
            }

            var _props = this.props,
                classNames = _props.classNames,
                columnState = _props.columnState,
                dataSource = _props.dataSource,
                gridData = _props.gridData,
                height = _props.height,
                infinite = _props.infinite,
                pager = _props.pager,
                pageSize = _props.pageSize,
                plugins = _props.plugins,
                reducerKeys = _props.reducerKeys,
                stateKey = _props.stateKey,
                customHeader = _props.customHeader;


            var headerHidden = columnState ? columnState.headerHidden : false;

            return _react2.default.createElement(
                'div',
                {
                    className: _prefix.prefix.apply(undefined, [CLASS_NAMES.CONTAINER, isLoading ? CLASS_NAMES.IS_LOADING : false].concat(_toConsumableArray(classNames)))
                },
                _react2.default.createElement(_Message2.default, {
                    reducerKeys: reducerKeys,
                    stateKey: stateKey,
                    store: store,
                    plugins: plugins
                }),
                _react2.default.createElement(_Toolbar2.default, {
                    plugins: plugins,
                    reducerKeys: reducerKeys,
                    selectionModel: this.selectionModel,
                    stateKey: stateKey,
                    store: store
                }),
                customHeader ? null : _react2.default.createElement(_FixedHeader2.default, _extends({
                    headerHidden: headerHidden
                }, this.getHeaderProps(true))),
                _react2.default.createElement(_TableContainer2.default, {
                    editorComponent: editorComponent,
                    headerProps: this.getHeaderProps(false),
                    height: height,
                    infinite: infinite,
                    rowProps: this.getRowProps(),
                    customHeader: customHeader
                }),
                _react2.default.createElement(_Pager2.default, {
                    dataSource: dataSource,
                    gridData: gridData,
                    pageSize: pageSize,
                    pagerState: pager,
                    plugins: plugins,
                    reducerKeys: reducerKeys,
                    stateKey: stateKey,
                    store: store
                }),
                _react2.default.createElement(_LoadingBar2.default, {
                    isLoading: isLoading,
                    plugins: plugins
                })
            );
        }
    }, {
        key: 'UNSAFE_componentWillMount',
        value: function UNSAFE_componentWillMount() {
            var _props2 = this.props,
                dataSource = _props2.dataSource,
                gridType = _props2.gridType,
                pageSize = _props2.pageSize,
                events = _props2.events,
                plugins = _props2.plugins,
                reducerKeys = _props2.reducerKeys,
                stateKey = _props2.stateKey;


            var columns = this.getColumns();
            var store = this.getStore();

            this.gridType = gridType === 'tree' ? 'tree' : 'grid';

            if (!stateKey) {
                throw new Error('A stateKey is required to intialize the grid');
            }

            this.setColumns();

            this.setData({ pageSize: pageSize });

            this.columnManager.init({
                plugins: plugins,
                store: store,
                events: events,
                selectionModel: this.selectionModel,
                editor: this.editor,
                columns: columns,
                dataSource: dataSource,
                reducerKeys: reducerKeys
            });

            this.selectionModel.init(plugins, stateKey, store, events);

            this.editor.init(plugins, stateKey, store, events);
        }
    }, {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function UNSAFE_componentWillReceiveProps(nextProps) {
            // for issue #30 -- if we're relying on a dataArray
            // as the dataSource, we need to trigger rerender
            // if the dataArray has changed

            if (this._USING_DATA_ARRAY) {
                // check to see if new data, is the same as old data
                // -- without _key property
                var shouldResetData = this.gridType === 'tree' ? !(0, _deepEqual2.default)(this.props.data, nextProps.data) : !(0, _deepEqual2.default)(this.props.data.map(this.removeKeys), nextProps.data.map(this.removeKeys));

                // sigh, this is a hack
                // if we do need to retrigger, we cant do
                // that within `componentWillReceiveProps`
                // instead, we need to pull the call of the call frame
                // we do this instead of applying logic inside of componentDidUpdate
                // since this is potentially a very expensive operation
                // and only want to rerun when props have actually changed
                if (shouldResetData) {
                    setTimeout(this.setData.bind(this), 0);
                }
            }
        }
    }]);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

        _this.setGridDataType = function () {
            return _this.__setGridDataType__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.removeKeys = function () {
            return _this.__removeKeys__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.getHeaderProps = function () {
            return _this.__getHeaderProps__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.getRowProps = function () {
            return _this.__getRowProps__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.getEditor = function () {
            return _this.__getEditor__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.getColumns = function () {
            return _this.__getColumns__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.isLoading = function () {
            return _this.__isLoading__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.addStyles = function () {
            return _this.__addStyles__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.getStore = function () {
            return _this.__getStore__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.shouldComponentUpdate = _shouldComponentUpdate.shouldGridUpdate.bind(_this);

        _this.columnManager = new _ColumnManager2.default();

        _this.editor = new _Manager2.default();

        _this.selectionModel = new _Model2.default();
        return _this;
    }

    _createClass(Grid, [{
        key: '__getStore__REACT_HOT_LOADER__',
        value: function __getStore__REACT_HOT_LOADER__() {
            return this.context.store || this.props.store;
        }
    }, {
        key: '__addStyles__REACT_HOT_LOADER__',
        value: function __addStyles__REACT_HOT_LOADER__() {
            var styleEl = document.createElement('style');
            var head = document.head || document.getElementsByTagName('head')[0];

            styleEl.type = 'text/css';

            if (styleEl.styleSheet) {
                styleEl.styleSheet.cssText = styles;
            } else {
                styleEl.appendChild(document.createTextNode(styles));
            }

            head.appendChild(styleEl);
        }
    }, {
        key: '__isLoading__REACT_HOT_LOADER__',
        value: function __isLoading__REACT_HOT_LOADER__() {
            return this.props.loadingState && this.props.loadingState.isLoading ? this.props.loadingState.isLoading : false;
        }
    }, {
        key: '__getColumns__REACT_HOT_LOADER__',
        value: function __getColumns__REACT_HOT_LOADER__() {
            var _props3 = this.props,
                columns = _props3.columns,
                columnState = _props3.columnState;


            if (columnState && columnState.get && columnState.get('columns')) {
                return columnState.get('columns');
            }

            return columns;
        }
    }, {
        key: '__getEditor__REACT_HOT_LOADER__',
        value: function __getEditor__REACT_HOT_LOADER__() {
            return this.editor.getComponent(this.props.plugins, this.props.reducerKeys, this.getStore(), this.props.events, this.selectionModel, this.editor, this.props.columns);
        }
    }, {
        key: '__getRowProps__REACT_HOT_LOADER__',
        value: function __getRowProps__REACT_HOT_LOADER__() {
            return {
                columnManager: this.columnManager,
                columns: this.getColumns(),
                dragAndDrop: this.props.dragAndDrop,
                editor: this.editor,
                emptyDataMessage: this.props.emptyDataMessage,
                dataSource: this.props.gridData,
                readFunc: this.setData.bind(this),
                pager: this.props.pager,
                editorState: this.props.editorState,
                selectedRows: this.props.selectedRows,
                events: this.props.events,
                pageSize: this.props.pageSize,
                plugins: this.props.plugins,
                reducerKeys: this.props.reducerKeys,
                selectionModel: this.selectionModel,
                stateKey: this.props.stateKey,
                store: this.getStore(),
                stateful: this.props.stateful,
                showTreeRootNode: this.props.showTreeRootNode,
                menuState: this.props.menuState,
                gridType: this.gridType
            };
        }
    }, {
        key: '__getHeaderProps__REACT_HOT_LOADER__',
        value: function __getHeaderProps__REACT_HOT_LOADER__(visible) {
            return {
                columnManager: this.columnManager,
                columns: this.getColumns(),
                plugins: this.props.plugins,
                reducerKeys: this.props.reducerKeys,
                dataSource: this.props.gridData,
                filterFields: this.props.filterFields,
                pager: this.props.pager,
                pageSize: this.props.pageSize,
                selectionModel: this.selectionModel,
                stateKey: this.props.stateKey,
                store: this.getStore(),
                stateful: this.props.stateful,
                visible: visible,
                menuState: this.props.menuState,
                gridType: this.gridType
            };
        }
    }, {
        key: '__removeKeys__REACT_HOT_LOADER__',
        value: function __removeKeys__REACT_HOT_LOADER__(item) {
            return _extends({}, item, {
                _key: undefined
            });
        }
    }, {
        key: '__setGridDataType__REACT_HOT_LOADER__',
        value: function __setGridDataType__REACT_HOT_LOADER__(asArray) {
            this._USING_DATA_ARRAY = asArray;
        }
    }, {
        key: 'setData',
        value: function setData() {
            var extraParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var _props4 = this.props,
                dataSource = _props4.dataSource,
                data = _props4.data,
                expandOnLoad = _props4.expandOnLoad,
                showTreeRootNode = _props4.showTreeRootNode,
                stateKey = _props4.stateKey,
                plugins = _props4.plugins;


            var store = this.getStore();

            var editMode = (0, _isPluginEnabled.isPluginEnabled)(plugins, 'EDITOR') ? plugins.EDITOR.type : null;

            if (this.gridType === 'tree') {
                if (typeof dataSource === 'string' || typeof dataSource === 'function') {
                    this.setGridDataType(false);
                    store.dispatch((0, _GridActions.getAsyncData)({
                        stateKey: stateKey,
                        dataSource: dataSource,
                        type: 'tree',
                        showTreeRootNode: showTreeRootNode,
                        extraParams: _extends({}, extraParams, {
                            expandOnLoad: expandOnLoad,
                            editMode: editMode
                        })
                    }));
                } else {
                    this.setGridDataType(true);
                    store.dispatch((0, _GridActions.setTreeData)({
                        stateKey: stateKey,
                        data: data,
                        showTreeRootNode: showTreeRootNode,
                        extraParams: _extends({}, extraParams, {
                            expandOnLoad: expandOnLoad,
                            editMode: editMode
                        })
                    }));
                }
            } else if (this.gridType === 'grid') {
                if (typeof dataSource === 'string' || typeof dataSource === 'function') {
                    this.setGridDataType(false);
                    store.dispatch((0, _GridActions.getAsyncData)({
                        stateKey: stateKey,
                        dataSource: dataSource,
                        extraParams: _extends({}, extraParams, { editMode: editMode })
                    }));
                } else if (data) {
                    this.setGridDataType(true);
                    store.dispatch((0, _GridActions.setData)({ stateKey: stateKey, data: data, editMode: editMode }));
                } else {
                    throw new Error('A data source, or a static data set is required');
                }
            }
        }
    }, {
        key: 'setColumns',
        value: function setColumns() {
            var _props5 = this.props,
                stateKey = _props5.stateKey,
                stateful = _props5.stateful;

            var store = this.getStore();
            var columns = this.getColumns();

            var savedColumns = columns;

            if (stateful) {
                savedColumns = (0, _getColumnsFromStorage.getColumnsFromStorage)(_LocalStorageManager2.default.getStateItem({ stateKey: stateKey, value: columns, property: 'columns' }), columns);
            }

            if (!columns || columns.length === 0 || !Array.isArray(columns)) {
                throw new Error('A columns array is required');
            } else {
                store.dispatch((0, _GridActions.setColumns)({ columns: savedColumns, stateKey: stateKey, stateful: stateful }));
            }
        }
    }]);

    return Grid;
}(_react.Component);

Grid.contextTypes = {
    store: object
};
Grid.propTypes = {
    classNames: array,
    columnState: object,
    columns: arrayOf(object).isRequired,
    data: any,
    dataSource: any,
    dragAndDrop: bool,
    editorState: object,
    emptyDataMessage: any,
    events: object,
    expandOnLoad: bool,
    filterFields: object,
    gridData: object,
    gridType: _GridConstants.GRID_TYPES,
    height: oneOfType([bool, string, number]),
    infinite: bool,
    loadingState: object,
    menuState: object,
    pageSize: number,
    pager: object,
    plugins: object,
    reducerKeys: oneOfType([object, string]),
    selectedRows: object,
    showTreeRootNode: bool,
    stateKey: string,
    stateful: bool,
    store: object
};
Grid.defaultProps = {
    classNames: [],
    columnState: {},
    columns: [],
    events: {},
    filterFields: {},
    height: '500px',
    pageSize: 25,
    reducerKeys: {},
    showTreeRootNode: false
};
Grid.CSS_LOADED = false;

var _default = (0, _reactRedux.connect)(_mapStateToProps.mapStateToProps)(Grid);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(any, 'any', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(array, 'array', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(arrayOf, 'arrayOf', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(bool, 'bool', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(object, 'object', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(oneOf, 'oneOf', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(oneOfType, 'oneOfType', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(number, 'number', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(string, 'string', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(Grid, 'Grid', 'src/components/Grid.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/Grid.jsx');
}();

;