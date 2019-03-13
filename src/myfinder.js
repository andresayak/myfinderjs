/**
 * @module andresayak/myfinder
 */

import Plugin from './plugin';

import MyFinderEditing from './myfinderediting';
import MyFinderUI from './myfinderui';
import MyFinderCommand from './myfindercommand';
/**
 * @extends module:core/plugin~Plugin
 */
export default class MyFinder{// extends Plugin{
    
    static get pluginName() {
	return 'MyFinder';
    }
    static get requires() {
	return [ MyFinderEditing, MyFinderUI ];
    }
}
