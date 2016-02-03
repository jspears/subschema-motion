"use strict";
import React, {Component} from 'react';
import List from './List.jsx';
import defaults from 'lodash/object/defaults';

export default class Filter extends Component {
    static contextTypes = defaults({}, List.contextTypes);
    static propTypes = defaults({}, List.propTypes);
    static defaultProps = defaults({}, List.defaultProps);
    state = {
        selected: 'all'
    };
    handleSelectAll = (e)=> {
        e && e.preventDefault();
        this.setState({selected: 'all'});
    };
    handleSelectActive = (e)=> {
        e && e.preventDefault();
        this.setState({selected: 'active'});

    };
    handleSelectCompleted = (e)=> {
        e && e.preventDefault();
        this.setState({selected: 'completed'});

    };
    handleClearCompleted = (e)=> {
        e && e.preventDefault();
        console.log('todo', 'not done');
        this.context.valueManager.update(this.props.path, this.props.value.filter(v=>!v.isDone));
    };

    filter(value) {
        if (this.state.selected === 'all') {
            return value;
        }
        if (this.state.selected === 'active') {
            return value.filter(v => !v.isDone);
        }
        if (this.state.selected === 'completed') {
            return value.filter(v => v.isDone);
        }
    }

    render() {

        const {value, ...rest} = this.props;

        const {selected} = this.state;

        const itemsLeft = value ? value.filter((v)=> {
            return !v.isDone;
        }).length : 0;

        const filteredValue = this.filter(value);
        return (<div>
            <List {...rest} value={filteredValue}/>

            <footer className="footer">
                  <span className="todo-count">
            <strong>
                {itemsLeft}
            </strong> {itemsLeft === 1 ? 'item' : 'items'} left
          </span>
                <ul className="filters">
                    <li>
                        <a
                            className={selected === 'all' ? 'selected' : ''}
                            onClick={this.handleSelectAll}>
                            All
                        </a>
                    </li>
                    <li>
                        <a
                            className={selected === 'active' ? 'selected' : ''}
                            onClick={this.handleSelectActive}>
                            Active
                        </a>
                    </li>
                    <li>
                        <a
                            className={selected === 'completed' ? 'selected' : ''}
                            onClick={this.handleSelectCompleted}>
                            Completed
                        </a>
                    </li>
                </ul>
                <button className="clear-completed" onClick={this.handleClearCompleted}>
                    Clear completed
                </button>
            </footer>
        </div>);

    }
}