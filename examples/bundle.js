(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var Grid = require('../../transformed/components/Grid.js');
var data = require('../../../examples/data.json').objects;

var columns = [{
    name: 'Name',
    dataType: 'account',
    render: function(record) {
        var name = record.user.firstName + ' ' + record.user.lastName;

        return (
            React.DOM.div( {onMouseOver:tdOnClick}, 
                React.DOM.img( {className:"grid-image", src:record.user.img} ),
                React.DOM.span(null, name)
            )
        );
    }
}, {
    name: 'Profit',
    dataProp: 'profit',
    dataType: 'number'
}, {
    name: 'Margin',
    dataProp: 'margin',
    dataType: 'number'
}, {
    name: 'Calls',
    dataProp: 'calls',
    dataType: 'number'
}];

var CoolComponent = React.createClass({displayName: 'CoolComponent',
    getInitialState: function() {
        return {data: data};
    },

    render: function() {
        return (
            React.DOM.div( {className:"my-cool-grid"}, 
                Grid(
                {onHeaderClick:sortColumn,
                data:this.state.data,
                columns:columns} )
            )
        );
    }
});

var rendered = React.renderComponent(CoolComponent(null ), document.querySelector('.react-render'));

function coolFn() {
    console.log('cool fn');
}

function sortColumn(column, index, dir) {
    console.log('sort column');

    if (column.dataType === 'number') {
        data.sort(function(a, b) {
            return a[column.dataProp] - b[column.dataProp];
        });
    } else if (column.dataType === 'account') {
        data.sort(function(a, b) {
            if(a.user.lastName < b.user.lastName) {
                return -1;
            }

            if(a.user.lastName > b.user.lastName) {
                return 1;
            }

            return 0;
        });
    }

    if (dir === 'dsc') {
        data.reverse();
    }

    rendered.setState({data: data});
}

function tdOnClick(evt) {
    console.log('hovered a td!', evt.target);
}

},{"../../../examples/data.json":6,"../../transformed/components/Grid.js":3}],2:[function(require,module,exports){
/** @jsx React.DOM */

var Cell = React.createClass({displayName: 'Cell',
    render: function() {
        return (
            React.DOM.td( {className:this.props.className}, 
                this.getData()
            )
        );
    },

    /**
     * @method getData
     * Gets data for a given record and column.
     * Attemps to use the column.render method, then falls back to column.dataProp.
     * @returns {*} - The render method result or record data.
     */
    getData: function() {
        var column = this.props.column;
        var record = this.props.record;

        if (typeof column.render === 'function') {
            return column.render(record);
        }

        return record[column.dataProp];
    }
});

module.exports = Cell;

},{}],3:[function(require,module,exports){
/** @jsx React.DOM */

var Header = require('./Header');
var Row = require('./Row');

/** @method emptyFn - Default handler for all events */
var emptyFn = function() {};

/** @class Grid - A grid for rendering data. */
var Grid = React.createClass({displayName: 'Grid',
    propTypes: {

        /** @prop [*] data - An array of data for the grid. */
        data: React.PropTypes.array.isRequired,

        /** @prop [Object] columns - An array of column objects for the grid. */
        columns: React.PropTypes.array.isRequired,

        /** @prop {String} cellClassName - The className of the grid's cells. */
        cellClassName: React.PropTypes.string,

        /** @prop {String} gridClassName - The className of the grid. */
        gridClassName: React.PropTypes.string,

        /** @prop {String} headerClassName - The className of the grid's headers. */
        headerClassName: React.PropTypes.string,

        /** @prop {Function} onHeaderClick - The method called when a grid header is clicked. */
        onHeaderClick: React.PropTypes.func,

        /** @prop {String} trClassName - The className of the grid's rows. */
        rowClassName: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            cellClassName: 'react-component-grid-cell',
            gridClassName: 'react-component-grid',
            headerClassName: 'react-component-grid-header',
            onHeaderClick: emptyFn,
            rowClassName: 'react-component-grid-row'
        };
    },

    getInitialState: function() {
        return {
            /** @prop {Number} sortedIndex - The index of the currently sorted column */
            sortedIndex: -1
        };
    },

    render: function() {
        return (
            React.DOM.table( {className:this.props.gridClassName}, 
                React.DOM.tr( {className:this.props.rowClassName}, 
                    this.renderHeaders()
                ),
                this.renderRows()
            )
        );
    },

    /**
     * @renderHeaders
     * Gets an array of table header components for the grid.
     * @returns [*] - An array of Header components.
     */
    renderHeaders: function() {
        return this.props.columns.map(function(column, columnIndex) {
            var key = 'react-component-grid-header-' + columnIndex;

            return (
                Header(
                {className:this.props.headerClassName,
                column:column,
                columnIndex:columnIndex,
                sortedIndex:this.state.sortedIndex,
                onHeaderClick:this.props.onHeaderClick,
                onGridSort:this.onGridSort,
                key:key} )
            );
        }, this);
    },

    /**
     * @renderRows
     * Gets an array of row components for the grid.
     * @returns [*] - An array of Row components.
     */
    renderRows: function() {
        return this.props.data.map(function(record, rowIndex) {
            var key = 'react-component-grid-row-' + rowIndex;

            return (
                Row(
                {className:this.props.rowClassName,
                cellClassName:this.props.cellClassName,
                columns:this.props.columns,
                key:key,
                record:record,
                rowIndex:rowIndex} )
            );
        }, this);
    },

    /**
     * @onGridSort
     * Sets the component's sortedIndex state when a column header is clicked.
     */
    onGridSort: function(columnIndex) {
        this.setState({
            sortedIndex: columnIndex
        });
    }
});

module.exports = Grid;

},{"./Header":4,"./Row":5}],4:[function(require,module,exports){
/** @jsx React.DOM */

var Header = React.createClass({displayName: 'Header',
    getInitialState: function() {
        return {
            direction: 'asc',
            sorted: false
        };
    },

    render: function() {
        return (
            React.DOM.th(
            {className:this.getClassName(),
            onClick:this.getClickHandler()}, 
                this.props.column.name
            )
        );
    },

    /**
     * @method getClassName
     * Contructs a class name for the table header.
     * Adds 'sorted-asc' or 'sorted-dsc' if the column sorted.
     * @returns {String} - The resulting class name.
     */
    getClassName: function() {
        if (this.props.sortedIndex === this.props.columnIndex) {
            return this.props.className + ' sorted-' + this.state.direction;
        }

        return this.props.className;
    },

    /**
     * @method getClickHandler
     * Gets a handler for when the table header is clicked.
     * Toggles the direction state and calls the supplied click handler.
     * Finally calls the onGridSort method from the parent grid.
     * @returns {Function} - The click handler for the table header.
     */
    getClickHandler: function() {
        return function(evt) {
            this.toggleDirection();

            this.props.onHeaderClick.call(
                this,
                this.props.column,
                this.props.columnIndex,
                this.state.direction,
                evt
            );

            this.props.onGridSort(this.props.columnIndex);
        }.bind(this);
    },

    /**
     * @method toggleDirection
     * Toggles the header's sort direction and sets its state.
     */
    toggleDirection: function() {
        var direction = this.state.direction === 'asc' ? 'dsc' : 'asc';

        this.setState({
            direction: direction
        });
    }
});

module.exports = Header;

},{}],5:[function(require,module,exports){
/** @jsx React.DOM */

var Cell = require('./Cell');

var Row = React.createClass({displayName: 'Row',
    render: function() {
        return (
            React.DOM.tr( {className:this.props.className}, 
                this.renderCell()
            )
        );
    },

    /**
     * @renderCell
     * Gets an array of cell components for the row.
     * @returns [Object] - An array of Cell components.
     */
    renderCell: function() {
        var record = this.props.record;
        var rowIndex = this.props.rowIndex;

        return this.props.columns.map(function(column, columnIndex) {
            var key = 'react-component-grid-cell-' + rowIndex + '-' + columnIndex;

            return (
                Cell(
                {className:this.props.cellClassName,
                column:column,
                key:key,
                record:record} )
            );
        }, this);
    }
});

module.exports = Row;

},{"./Cell":2}],6:[function(require,module,exports){
module.exports={
    "objects": [{
        "user": {
            "firstName": "John",
            "lastName": "Smith",
            "img": "user.png"
        },
        "profit": 50,
        "margin": 0.5,
        "calls": 20
    }, {
        "user": {
            "firstName": "<i>Jane</i>",
            "lastName": "Doe",
            "img": "user.png"
        },
        "profit": 75,
        "margin": 0.4,
        "calls": 65
    }, {
        "user": {
            "firstName": "Tim",
            "lastName": "McCool",
            "img": "user.png"
        },
        "profit": 88,
        "margin": 0.2,
        "calls": 83
    }, {
        "user": {
            "firstName": "Charley",
            "lastName": "Wood",
            "img": "user.png"
        },
        "profit": 10,
        "margin": 0.9,
        "calls": 104
    }, {
        "user": {
            "firstName": "Jessica",
            "lastName": "White",
            "img": "user.png"
        },
        "profit": 745,
        "margin": 0.98,
        "calls": 33
    }, {
        "user": {
            "firstName": "Jane",
            "lastName": "Brown",
            "img": "user.png"
        },
        "profit": 512,
        "margin": 0.23,
        "calls": 4
    }, {
        "user": {
            "firstName": "Tony",
            "lastName": "Black",
            "img": "user.png"
        },
        "profit": 230,
        "margin": 0.6,
        "calls": 71
    }, {
        "user": {
            "firstName": "Jim",
            "lastName": "Green",
            "img": "user.png"
        },
        "profit": 8763,
        "margin": 0.12,
        "calls": 334
    }, {
        "user": {
            "firstName": "John",
            "lastName": "Smith",
            "img": "user.png"
        },
        "profit": 315,
        "margin": 0.76,
        "calls": 44
    }, {
        "user": {
            "firstName": "Legolas",
            "lastName": "De'Elf",
            "img": "user.png"
        },
        "profit": 456,
        "margin": 0.11,
        "calls": 768
    }, {
        "user": {
            "firstName": "Frodo",
            "lastName": "Baggins",
            "img": "user.png"
        },
        "profit": 5,
        "margin": 0.2,
        "calls": 1
    }, {
        "user": {
            "firstName": "Morgan",
            "lastName": "Jones",
            "img": "user.png"
        },
        "profit": 422,
        "margin": 0.12,
        "calls": 44
    }, {
        "user": {
            "firstName": "Red",
            "lastName": "Foreman",
            "img": "user.png"
        },
        "profit": 865,
        "margin": 0.345,
        "calls": 993
    }, {
        "user": {
            "firstName": "Kate",
            "lastName": "Winnings",
            "img": "user.png"
        },
        "profit": 23,
        "margin": 0.234,
        "calls": 12
    }]
}

},{}]},{},[1]);