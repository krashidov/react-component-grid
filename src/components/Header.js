/** @jsx React.DOM */

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
            onClick={this.props.onClick.bind(this)}>
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
        if (this.props.column.sorted) {
            return this.props.className + ' sorted-' + this.props.column.sortedDirection;
        }

        return this.props.className;
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
