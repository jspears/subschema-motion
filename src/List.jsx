"use strict";
import React from 'react';
import {types, tutils, PropTypes} from 'subschema';
import {TransitionMotion, spring, presets} from 'react-motion';
import syncWrapped from './syncWrapped';
import defaults from 'lodash/object/defaults';
const {path} = tutils;


export default class MotionList extends types.List {

    static propTypes = defaults({
        transitionItemTo: PropTypes.func,
        transitionItemFrom: PropTypes.func,
        transitionItemEnter: PropTypes.func,
        transitionItemLeave: PropTypes.func
    }, types.List.propTypes);

    static defaultProps = defaults({
        transitionItemTo(){
            return {
                height: spring(60, presets.gentle),
                opacity: spring(1, presets.gentle)
            };
        },
        transitionItemFrom(){
            return {
                height: 0,
                opacity: 0.01
            };
        },
        transitionItemEnter(){
            return {
                height: 0,
                opacity: 1
            }
        },
        transitionItemLeave() {
            return {
                height: spring(0),
                opacity: spring(0.01)
            }
        }
    }, types.List.defaultProps);

    constructor(prop, ...rest) {
        super(prop, ...rest);
    }

    wrapValues(value) {
        return syncWrapped(this.state.wrapped, value);
    }


    transitionItemFrom({id, pid, value}) {
        return {
            pid,
            data: value,
            key: id,
            style: this.transitionItemFrom()
        }
    };

    transitionItemTo({id, pid, value}) {
        return {
            data: value,
            pid,
            key: id,
            style: this.transitionItemTo()
        };
    }

    getDefaultStyles = () => {
        return this.state.wrapped.map(this.transitionItemFrom, this.props);
    };

    getStyles = () => {
        return this.state.wrapped.map(this.transitionItemTo, this.props);
    };

    renderRowEachMotion = ({pid, key, style, data}, i) => {

        const ItemTemplate = this.props.itemTemplate, ContentItemTemplate = this.props.contentTemplate;
        const value = {value: data, key: pid};
        return (<ItemTemplate style={style} key={key} pos={i} path={ path(this.props.path, i)}
                              onMoveUp={this.handleMoveUp}
                              onMoveDown={this.handleMoveDown}
                              onDelete={this.handleDelete}
                              onEdit={this.handleEdit}
                              canReorder={this.props.canReorder}
                              canDelete={this.props.canDelete}
                              canEdit={this.props.canEdit}
                              pid={pid}
                              value={value} errors={this.props.errors} last={i + 1 === this.state.wrapped.length}>
            {this.props.inline && this.state.editPid === v.key ? this.renderAddEditTemplate(v, false) :
                <ContentItemTemplate labelKey={this.props.labelKey}
                                     pos={i}
                                     pid={pid}
                                     value={value}
                                     showKey={this.props.showKey}
                                     onClick={this.props.canEdit ? this.handleEdit : null}/> }
        </ItemTemplate>);
    };

    render() {
        return (<div className={this.props.className}>
            {this.renderAdd()}
            <TransitionMotion
                defaultStyles={this.getDefaultStyles()}
                styles={this.getStyles()}
                willLeave={this.props.transitionItemLeave}
                willEnter={this.props.transitionItemEnter}>
                {styles =>
                    <ul className={this.props.listContainerClassName}>
                        {styles.map(this.renderRowEachMotion)}
                    </ul>
                }
            </TransitionMotion>
        </div>);
    }
}