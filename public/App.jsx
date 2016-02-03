"use strict";
import React, {Component} from "react";
import Subschema,{Form, loader, valueManager, loaderFactory} from "Subschema";
import subschemaMotion from '../src';
import Demo from './Demo.jsx';

loader.addLoader(subschemaMotion);

var schema = {
    "schema": {
        "todos": {
            "type": "List",
            title: false,
            canAdd: true,
            canReorder: false,
            canDelete: true,
            canEdit: false,
            showAdd: true,
            labelKey: "text",
            listContainerClassName: "todo-list",
            itemType: {
                type: "Object",
                subSchema: {
                    "text": {
                        type: "Text",
                        title: false,
                        className: "new-todo",
                        placeholder: "What needs to be done?"
                    }
                }
            },
            buttons: {
                buttonsClass: ' ',
                buttons: [{label: 'Add', action: 'submit', className:'todo-add-btn'}]
            }
        }
    },
    "fieldsets": [
        {
            "className": "todoapp",
            "fields": "todos"
        }
    ]
};
var value = {
    todos: [
        {
            "text": "Board the plane",
            "isDone": false
        },
        {
            "text": "Sleep",
            "isDone": false
        },
        {
            "text": "Try to finish conference slides",
            "isDone": false
        },
        {
            "text": "Eat cheese and drink wine",
            "isDone": false
        },
        {
            "text": "Go around in Uber",
            "isDone": false
        },
        {
            "text": "Talk with conf attendees",
            "isDone": false
        },
        {
            "text": "Show Demo 1",
            "isDone": false
        },
        {
            "text": "Show Demo 2",
            "isDone": false
        },
        {
            "text": "Lament about the state of animation",
            "isDone": false
        },
        {
            "text": "Show Secret Demo",
            "isDone": false
        },
        {
            "text": "Go home",
            "isDone": false
        }
    ]
};
//<Demo/>

export default class App extends Component {
    render() {
        return <div>
            <h3>subschema-motion</h3>
            <p>React Motion for subschema.</p>

            <Form schema={schema} value={value}/>
        </div>
    }
}