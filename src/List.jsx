"use strict";
import React from 'react';
import {types, tutils} from 'subschema';
import {TransitionMotion, spring, presets} from 'react-motion';
import syncWrapped from './syncWrapped';
const {path} = tutils;

export default class MotionList extends types.List {

    constructor(prop, ...rest) {
        super(prop, ...rest);
        var state = this.state || (this.state = {});

        state.value = state.value || '';
        state.selected = state.selected || 'all';

    }

    wrapValue(value) {
        value = value || [];
        if (this.state && this.state.wrapped) {
            return syncWrapped(this.state.wrapped, value);
        }
        return super.wrapValue(value);

    }

    getDefaultStyles = ()=> {
        const defStyles = this.state.wrapped.map(({key, value, ...todo}) => ({
            ...todo,
            data: value,
            key: '' + key,
            style: {height: 0, opacity: 1}
        }));
        return defStyles;
    };

    getStyles = ()=> {
        const {wrapped, value, selected} = this.state;
        return wrapped.filter(({value: {isDone, text}}) => {
                return text.toUpperCase().indexOf(value.toUpperCase()) >= 0 &&
                    (selected === 'completed' && isDone ||
                    selected === 'active' && !isDone ||
                    selected === 'all');
            })
            .map(({value,key,...todo}, i) => {
                return {
                    ...todo,
                    key: '' + key,
                    data: value,
                    style: {
                        height: spring(60, presets.gentle),
                        opacity: spring(1, presets.gentle),
                    }
                };
            });
    };

    willEnter = ()=> {
        return {
            height: 0,
            opacity: 1
        };
    };

    willLeave = ()=> {
        return {
            height: spring(0),
            opacity: spring(0)
        };
    };

    /*
     (<div className={className}>
     {this.renderAdd()}
     <ul className={listClassName}>
     {values.map(this.renderRowEach, this)}
     </ul>
     </div>);*/
    renderRowEachMotion = ({key, style, data}, i) => {

        const ItemTemplate = this.props.itemTemplate, ContentItemTemplate = this.props.contentTemplate;
        const value = {value: data, key};
        return <ItemTemplate style={style} key={key} pos={i} path={ path(this.props.path, i)}
                             onMoveUp={this.handleMoveUp}
                             onMoveDown={this.handleMoveDown}
                             onDelete={this.handleDelete}
                             onEdit={this.handleEdit}
                             canReorder={this.props.canReorder}
                             canDelete={this.props.canDelete}
                             canEdit={this.props.canEdit}
                             field={value}
                             pid={key}
                             value={value} errors={this.props.errors} last={i + 1 === this.state.wrapped.length}>
            {this.props.inline && this.state.editPid === v.key ? this.renderAddEditTemplate(v, false) :
                <ContentItemTemplate labelKey={this.props.labelKey}
                                     pos={i}
                                     pid={key}
                                     value={value}
                                     showKey={this.props.showKey}
                                     onClick={this.props.canEdit ? this.handleEdit : null}/> }
        </ItemTemplate>
    };

    render() {

        const {wrapped, value, selected} = this.state;
        //  const itemsLeft = wrapped.filter(({data: {isDone}}) => !isDone).length;
        var {name,  itemType, errors,className, listClassName, canReorder, canDelete, itemTemplate, canEdit, canAdd } = this.props, values = this.state.wrapped || EMPTY_ARR, length = values.length;
        return (<div className={className}>
            {this.renderAdd()}
            <TransitionMotion
                defaultStyles={this.getDefaultStyles()}
                styles={this.getStyles()}
                willLeave={this.willLeave}
                willEnter={this.willEnter}>
                {styles =>
                    <ul className="todo-list">
                        {styles.map(this.renderRowEachMotion)}
                    </ul>
                }
            </TransitionMotion>
        </div>);
    }
}