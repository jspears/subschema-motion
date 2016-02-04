import React, {Component} from 'react';
import {templates, tutils, PropTypes} from 'subschema';
import _get from 'lodash/object/get'

const _path = tutils.path;

const { noop} = tutils;
const Button = templates.ButtonTemplate;

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
        const fp = _path(path, 'isDone');
        console.log('handleComplete', fp, !value.value.isDone);

        this.context.valueManager.update(fp, !value.value.isDone);
    };

    handleEdit = (e)=> {
        e.preventDefault();
        var val = this.props.value;

        this.props.onEdit(this.props.pos, val.value, this.props.pid);
    };

    render() {
        const {pos,  value, errors, style, path, onValidate,type, name, canReorder, canDelete, last, onValueChange} = this.props;
        const {isDone} = value.value;
        const idDone = _path(path, 'isDone');
        return <li className={isDone ? 'completed' : ''} style={style}>
            <div className="view">
                <input className="toggle" type="checkbox" onChange={::this.handleComplete} checked={isDone}
                       value={isDone+''} id={idDone} name={idDone}/>
                <label htmlFor={idDone}>{value.value.text}</label>
            </div>
            <Button key="btn-down" onClick={::this.handleMoveDown} className="ico-btn btn-move-down" value="" label=""/>
            <Button key="btn-up" onClick={::this.handleMoveUp} className="ico-btn btn-move-up" value="" label=""/>
            <Button key="btn-destroy" onClick={::this.handleDelete} className="destroy" value="" label=""/>
        </li>

    }
}