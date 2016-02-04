"use strict";
import React, {Component} from 'react';
import {PropTypes, decorators} from 'subschema';
export default class CollectionCreateTemplate extends Component {

    static contextTypes = PropTypes.contextTypes;


    handleChange = (e)=> {

        const todos = this.context.valueManager.path('todos').map(v=> {
            v.isDone = !v.isDone;
            return v;
        });

        this.context.valueManager.update('todos', todos);
    };

    render() {

        return (  <header className="header" >
            <h1>todos</h1>
            {this.props.children}
            <input className="toggle-all" type="checkbox" style={{top:'25px'}} onChange={this.handleChange}/>
        </header>);
    }
};

