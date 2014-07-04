/** @jsx React.DOM */
var Grid = require('../../transformed/components/Grid.js');
var data = require('../../../examples/data.json').objects;

var columns = [{
    name: 'Name',
    dataType: 'account',
    render: function(record) {
        var name = record.user.firstName + ' ' + record.user.lastName;

        return (
            <div onMouseOver={tdOnClick}>
                <img className="grid-image" src={record.user.img} />
                <span>{name}</span>
            </div>
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

var CoolComponent = React.createClass({
    getInitialState: function() {
        return {data: data};
    },

    render: function() {
        return (
            <div className="my-cool-grid">
                <Grid
                onHeaderClick={sortColumn}
                data={this.state.data}
                columns={columns} />
            </div>
        );
    }
});

var rendered = React.renderComponent(<CoolComponent />, document.querySelector('.react-render'));

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
