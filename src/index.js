"use strict";
import {loaderFactory} from 'subschema';
import CollectionCreateTemplate from './CollectionCreateTemplate.jsx';
import ContentItemTemplate from './ContentItemTemplate.jsx';
import ListItemTemplate from './ListItemTemplate.jsx';
import List from './List.jsx';
const loader = loaderFactory();

loader.addTemplate({
    CollectionCreateTemplate,
    ListItemTemplate,
    ContentItemTemplate
});
loader.addType({List});


export default loader;