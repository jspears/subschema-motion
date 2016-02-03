import React, {Component} from 'react';
import {templates, tutils, PropTypes} from 'subschema';
import _get from 'lodash/object/get'


const {path, noop} = tutils;
const { ButtonTemplate} = templates;
const Button = ButtonTemplate;

export default class ListItemTemplate extends Component {
    static contextTypes = PropTypes.contextTypes;
    static defaultProps = {
        type: 'Text',
        onMoveUp: noop,
        onMoveDown: noop,
        onDelete: noop,
        onValidate: noop,
        onValueChange: noop,
        onEdit: noop,
        last: false,
        style: {}
    };

    handleMoveUp = (e)=> {
        e.preventDefault();
        this.props.onMoveUp(this.props.pos, this.props.value, this.props.pid);
    };

    handleMoveDown = (e)=> {
        e.preventDefault();
        this.props.onMoveDown(this.props.pos, this.props.value, this.props.pid);
    };

    handleDelete = (e)=> {
        e.preventDefault();
        this.props.onDelete(this.props.pos, this.props.value, this.props.pid);
    };

    handleComplete(e) {
        const {path, value} = this.props;
        this.context.valueManager.update(path + '.isDone', !value.value.isDone);
    };


    render() {
        const {pos,  value, errors, style, path, onValidate,type, name, canReorder, canDelete, last, onValueChange} = this.props;
        const {isDone} = value.value;
        return <li className={isDone ? 'completed' : ''} style={style}>
            <div className="view">
                <input className="toggle" type="checkbox" onChange={::this.handleComplete} checked={isDone}
                       value={isDone+''} id={path+'.isDone'} name={path+'.isDone'}/>
                <label htmlFor={path+'.isDone'}>{value.value.text}</label>
            </div>
            <Button key="buttons" onClick={::this.handleDelete} className="destroy" value="" label=""/>
        </li>

    }
}