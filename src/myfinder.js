/**
 * @module andresayak/myfinder
 */

import MyFinderEditing from './myfinderediting';
import MyFinderUI from './myfinderui';
import MyFinderCommand from './myfindercommand';

export default class MyFinder{
    
    static get pluginName() {
	return 'MyFinder';
    }
    static get requires() {
	return [ MyFinderEditing, MyFinderUI ];
    }
}
