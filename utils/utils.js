"use strict";
exports.__esModule = true;
exports.removeWhitespace = exports.replaceExcessWhitespaceWithSingle = exports.readFile = void 0;
var fs = require("fs");
var readline = require("readline");
var readFile = function (fileName) {
    return readline.createInterface({
        input: fs.createReadStream(fileName)
    });
};
exports.readFile = readFile;
var replaceExcessWhitespaceWithSingle = function (string) {
    return string.replace(/\s+/g, " ");
};
exports.replaceExcessWhitespaceWithSingle = replaceExcessWhitespaceWithSingle;
var removeWhitespace = function (string) { return string.replace(/\s+/g, ""); };
exports.removeWhitespace = removeWhitespace;
