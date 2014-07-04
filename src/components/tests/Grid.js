/** @jsx React.DOM */

var assert = require('chai').assert;
var React = require('react/addons');
var rewire = require('rewire');
var TestUtils = React.addons.TestUtils;

var Grid = rewire('../Grid');

//mock header
Grid.__set__('Header', function() {
    return (<div className="mock-header">mock header</div>);
});

//mock row
Grid.__set__('Row', function() {
    return (<div className="mock-row">mock row</div>);
});

describe('Grid', function() {
    var columns = [{name: 'Profit'}, {name: 'Margin'}];
    var data = [{profit: 10, margin: 20}, {profit: 5, margin: 3}, {profit: 3, margin: 1}];

    it('should render a grid', function() {
        var rendered = TestUtils.renderIntoDocument(<Grid columns={columns} data={data} />);
        var headers = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'mock-header');
        var rows = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'mock-row');

        assert.equal(headers.length, 2);
        assert.equal(rows.length, 3);
    });

    it('should set state on grid sort', function() {
        var rendered = TestUtils.renderIntoDocument(<Grid columns={columns} data={data} />);

        assert.equal(rendered.state.sortedIndex, -1);
        rendered.onGridSort(4);
        assert.equal(rendered.state.sortedIndex, 4);
    });
});
