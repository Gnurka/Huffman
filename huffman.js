// Huffman coding with Underscore.js

var text = "The transportation calculation timed out. Please set the price manually or increase the timeout value in the plugin settings.";
console.log(text);

var frequencies = _.countBy(text, function(ch) {
    return ch;
});

var tjo = _.map(frequencies, function(num, key) {
    return {num: num, key: key};
});

tjo = _.sortBy(tjo, function(i) {
    return i.num;
});

console.log(frequencies);
console.log(tjo);