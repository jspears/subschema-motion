import React, {Component} from 'react';
import {PropTypes} from 'subschema';
import _get from 'lodash/object/get'

export default class ContentItemTemplate extends Component {
    static propTypes = {
        showKey: PropTypes.bool,
        labelKey: PropTypes.string,
        value(props, propName, componentName) {
            var value = props[propName];
            var labelKey = props.labelKey;
            if ('value' in props) {
                if (labelKey) {
                    return PropTypes.node(props.value, labelKey, componentName)
                } else
                    return PropTypes.node(value, 'value', componentName);
            }
            if (props.showKey) {
                return PropTypes.node(props, 'key', componentName);
            }
        }
    };
    //(pos, val, pid)
    handleSelect = (e)=> {
        e && e.preventDefault();
        //       this.props.onClick(this.props.pos, this.props.value.value, this.props.pid);
    };
    /*        <li style="height: 60px; opacity: 1;" class="" data-reactid=".0.2.1.1.$t6">
     <div class="view" data-reactid=".0.2.1.1.$t6.0">
     <input class="toggle" type="checkbox"
     data-reactid=".0.2.1.1.$t6.0.0"><label
     data-reactid=".0.2.1.1.$t6.0.1">Talk with conf attendees</label>
     <button class="destroy" data-reactid=".0.2.1.1.$t6.0.2"></button></div>
     </li>*/

    render() {
        const {value,showKey, children, labelKey} = this.props;
        const key = value.key || '';
        const label = labelKey ? _get(value.value, labelKey, '') : value.value;
        const {isDone} = value.value;
        return (
            <div className="view">
                <input className="toggle" type="checkbox" onChange={this.handleSelect} checked={isDone}/>
                <label> {label}</label>
                {children}
            </div>
        );
    }
}
