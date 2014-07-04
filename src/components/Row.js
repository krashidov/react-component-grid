/** @jsx React.DOM */

var React = require('react');

var Cell = require('./Cell');

var Row = React.createClass({
    render: function() {
        return (
            <tr className={this.props.className}>
                {this.renderCell()}
            </tr>
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
                <Cell
                className={this.props.cellClassName}
                column={column}
                key={key}
                record={record} />
            );
        }, this);
    }
});

module.exports = Row;
