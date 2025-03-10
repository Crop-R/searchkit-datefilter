"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment = require("moment");
var styles = require("rc-calendar/assets/index.css");
var searchkit_1 = require("searchkit");
var RcCalendar = require("rc-calendar");
var RangeCalendar = require('rc-calendar/lib/RangeCalendar');
var enUS = require('rc-calendar').enUS;
var DatePicker = require('rc-calendar/lib/Picker');
var format = 'dddd D. MMMM YYYY';
var fullFormat = 'DD-MM-YYYY';
var Picker = /** @class */ (function (_super) {
    __extends(Picker, _super);
    function Picker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Picker.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var showValue = props.showValue;
        var calendar = (React.createElement(RangeCalendar, { type: this.props.type, locale: enUS, format: format, onChange: props.onChange, disabledDate: props.disabledDate, showToday: true, showOk: false, showClear: false }));
        return (React.createElement(DatePicker, { prefixCls: "sk-calendar-picker", open: this.props.open, onOpenChange: this.props.onOpenChange, calendar: calendar, value: props.value, dateFormat: format, align: {
                points: ['bl', 'tl']
            }, getCalendarContainer: this.props.containerId ? function () { return document.getElementById(_this.props.containerId); } : null }, function () { return (React.createElement("div", { className: "sk-date-box" },
            React.createElement("div", { className: "sk-date-box__label", style: { flex: "1 0 80px" } },
                _this.props.dateInputPlaceholder,
                ":"),
            React.createElement("div", { className: "sk-date-box__value", style: { flex: "1 0 50%" } }, showValue && moment(showValue).format(fullFormat)))); }));
    };
    return Picker;
}(searchkit_1.SearchkitComponent));
exports.Picker = Picker;
;
var DateRangeCalendar = /** @class */ (function (_super) {
    __extends(DateRangeCalendar, _super);
    function DateRangeCalendar(props) {
        var _this = _super.call(this, props) || this;
        _this.onStartOpenChange = function (startOpen) {
            _this.setState({
                startOpen: startOpen,
            });
        };
        _this.onEndOpenChange = function (endOpen) {
            _this.setState({
                endOpen: endOpen,
            });
        };
        _this.onStartChange = function (value) {
            _this.setState({
                startValue: value[0],
                startOpen: false,
                endOpen: false,
            });
            _this.handleChange(value);
            if (typeof (_this.props.onStartValueChange) === 'function') {
                _this.props.onStartValueChange(value);
            }
        };
        _this.onEndChange = function (value) {
            _this.handleChange(value);
            if (typeof (_this.props.onEndValueChange) === 'function') {
                _this.props.onEndValueChange(value);
            }
        };
        _this.clearState = function () {
            var onFinished = _this.props.onFinished;
            _this.setState({
                startValue: null,
                endValue: null,
            });
            onFinished({
                fromDate: null,
                toDate: null
            });
        };
        // For disabling past dates
        _this.disabledPastDate = function (endValue) {
            if (endValue.diff(moment(), 'days') < 0) {
                return true;
            }
            return false;
        };
        _this.disabledStartDate = function (endValue) {
            if (!endValue) {
                return false;
            }
            var startValue = _this.state.startValue;
            if (!startValue) {
                return false;
            }
            return endValue.diff(startValue, 'days') < 0;
        };
        _this.handleChange = function (value) {
            var startValue = value[0];
            var endValue = value[1];
            var onFinished = _this.props.onFinished;
            var notToday = startValue > +moment().endOf("day")
                || startValue < +moment().startOf("day");
            onFinished({
                fromDate: notToday && startValue.utc().startOf("day") || startValue,
                toDate: endValue && endValue.utc().endOf("day")
            });
        };
        var fromDate = props.fromDate, toDate = props.toDate;
        _this.state = {
            startOpen: false,
            endOpen: false,
        };
        return _this;
    }
    DateRangeCalendar.prototype.render = function () {
        var state = this.state;
        var _a = this.props, fromDate = _a.fromDate, toDate = _a.toDate, fromDateValue = _a.fromDateValue, toDateValue = _a.toDateValue;
        var fromLabel = this.props.fromLabel || "From";
        var toLabel = this.props.toLabel || "To";
        return (React.createElement("div", null,
            React.createElement(Picker, { onOpenChange: this.onStartOpenChange, open: this.state.startOpen, type: "start", showValue: fromDateValue, value: [fromDate, toDate], onChange: this.onStartChange, dateInputPlaceholder: fromLabel, containerId: this.props.containerId }),
            React.createElement(Picker, { onOpenChange: this.onEndOpenChange, open: this.state.endOpen, type: "end", showValue: toDateValue, disabledDate: this.disabledStartDate, value: [fromDate, toDate], onChange: this.onEndChange, dateInputPlaceholder: toLabel, containerId: this.props.containerId })));
    };
    return DateRangeCalendar;
}(searchkit_1.SearchkitComponent));
exports.DateRangeCalendar = DateRangeCalendar;
//# sourceMappingURL=DateRangeCalendar.js.map