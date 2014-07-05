/** @jsx React.DOM */

var assert = require('chai').assert;
var stub = require('sinon').stub;
var TestUtils = React.addons.TestUtils;

var Header = require('../Header');

describe('Header', function() {
    it('should render a header', function() {
        var column = {name: 'Profit'};
        var rendered = TestUtils.renderIntoDocument(
            <Header column={column} />
        );

        assert.equal(rendered.getDOMNode().textContent, 'Profit');
    });

    it('should get an unsorted class name', function() {
        var column = {name: 'Profit'};
        var rendered = TestUtils.renderIntoDocument(
            <Header column={column} className="cool-header" columnIndex={0} />
        );

        assert.equal(rendered.getClassName(), 'cool-header');
    });

    it('should get a sorted class name', function() {
        var column = {name: 'Profit'};
        var rendered = TestUtils.renderIntoDocument(
            <Header className="cool-header" column={column} columnIndex={0} sortedIndex={0} />
        );

        rendered.setState({direction: 'asc'});
        assert.equal(rendered.getClassName(), 'cool-header sorted-asc');
    });

    it('should utilize a click handler', function() {
        var onGridSort = stub();
        var onHeaderClick = stub();
        var column = {name: 'Profit'};
        var rendered = TestUtils.renderIntoDocument(
            <Header
            className="cool-header"
            column={column}
            columnIndex={3}
            onGridSort={onGridSort}
            onHeaderClick={onHeaderClick}
            sortedIndex={3} />
        );
        var handler;

        rendered.setState({direction: 'asc'});
        handler = rendered.getClickHandler();
        handler('mock event');

        assert.equal(onGridSort.callCount, 1);
        assert.isTrue(onGridSort.calledWith(3));
        assert.equal(onHeaderClick.callCount, 1);
        assert.isTrue(onHeaderClick.calledWith(column, 3, 'dsc', 'mock event'));

        TestUtils.Simulate.click(rendered.getDOMNode());
        assert.equal(onGridSort.callCount, 2);
        assert.equal(onHeaderClick.callCount, 2);
    });

    it('should toggle direction', function() {
        var column = {name: 'Profit'};
        var rendered = TestUtils.renderIntoDocument(
            <Header column={column} />
        );

        rendered.setState({direction: 'asc'});

        rendered.toggleDirection();
        assert.equal(rendered.state.direction, 'dsc');

        rendered.toggleDirection();
        assert.equal(rendered.state.direction, 'asc');

        rendered.toggleDirection();
        assert.equal(rendered.state.direction, 'dsc');
    });
});
