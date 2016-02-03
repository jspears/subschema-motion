"use strict";
import {loaderFactory} from 'subschema';
import CollectionCreateTemplate from './CollectionCreateTemplate.jsx';
import ContentItemTemplate from './ContentItemTemplate.jsx';
import ListItemTemplate from './ListItemTemplate.jsx';
import List from './List.jsx';
import Filter from './Filter.jsx';
const loader = loaderFactory();

loader.addTemplate({
    CollectionCreateTemplate,
    ListItemTemplate,
    ContentItemTemplate
});
loader.addType({List, Filter});


export default loader;