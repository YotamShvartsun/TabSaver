import '@babel/polyfill';
import { define } from 'hybrids';
import * as API from './api';
import * as Tab from './elements/tab';
import * as Group from './elements/group';

const l = new API.Loader();
l.InsertNew('a', [{ url: 'http://google.com' }, { url: 'test.com' }]);
l.InsertNew('b', [{ url: 'twitter.com' }, { url: 'test.com' }]);
define('tab-url', Tab.Tab);
define('url-group', Group.Group);
