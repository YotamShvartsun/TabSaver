import "@babel/polyfill"
import * as API from './api';
import * as Tab from './elements/tab'
import * as Group from './elements/group'
import define from 'hybrids/lib/define';

define('tab-url', Tab.Tab);
define('url-group', Group.Group);