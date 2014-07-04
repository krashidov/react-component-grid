/** @jsx React.DOM */

var React = require('react');

var Header = React.createClass({
    getInitialState: function() {
        return {
            direction: 'asc',
            sorted: false
        };
    },

    render: function() {
        return (
            <th
            className={this.getClassName()}
            onClick={this.getClickHandler()}>
                {this.props.column.name}
            </th>
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
