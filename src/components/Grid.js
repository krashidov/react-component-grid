/** @jsx React.DOM */

var React = require('react');

var Header = require('./Header');
var Row = require('./Row');

/** @method emptyFn - Default handler for all events */
var emptyFn = function() {};

/** @class Grid - A grid for rendering data. */
var Grid = React.createClass({
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
            <table className={this.props.gridClassName}>
                <tr className={this.props.rowClassName}>
                    {this.renderHeaders()}
                </tr>
                {this.renderRows()}
            </table>
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
                <Header
                className={this.props.headerClassName}
                column={column}
                columnIndex={columnIndex}
                sortedIndex={this.state.sortedIndex}
                onHeaderClick={this.props.onHeaderClick}
                onGridSort={this.onGridSort}
                key={key} />
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
                <Row
                className={this.props.rowClassName}
                cellClassName={this.props.cellClassName}
                columns={this.props.columns}
                key={key}
                record={record}
                rowIndex={rowIndex} />
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
