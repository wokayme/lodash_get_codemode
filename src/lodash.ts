import _ from 'lodash';

var object = { 'a': { 'b': { 'c': 3 } } };

const getObject = ()=>object;
 
_.get(getObject(), 'a.b.c');
_.get(object, 'a.b.c', 'default');