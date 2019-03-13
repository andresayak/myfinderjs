
FOR LARAVE MIX


let mix = require('./node_modules/laravel-mix/src/index');

let ComponentFactory = require('./node_modules/laravel-mix/src/components/ComponentFactory');

new ComponentFactory().installAll();
require(Mix.paths.mix());
Mix.dispatch('init', Mix);
let WebpackConfig = require('./node_modules/laravel-mix/src/builder/WebpackConfig');
var config = new WebpackConfig().build();
var rules = config.module.rules;
rules = rules.filter((item) => {
    var string = item.test.toString();
    if ((string) == (new RegExp(/(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/)).toString()) {
        return false;
    }
    return true;
});
rules.unshift(
        {
            test: /myfinderjs[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            use: ["raw-loader"]
        }
);
config.module.rules = rules;
module.exports = config;
