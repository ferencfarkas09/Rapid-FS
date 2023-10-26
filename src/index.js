"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_class_1 = require("./fs.class");
var fs = new fs_class_1.FS("topdir");
// Store
fs.store("filename1", "a very long string1");
fs.store("filename2", "a very long string1");
fs.store("filename3", "a very long string3");
// Read
var result1 = fs.get("filename1"); // gets 'a very long string1'
var result2 = fs.get("filename2"); // gets 'a very long string1'
var result3 = fs.get("filename3"); // gets 'a very long string3'
console.log('Result #1', result1);
console.log('Result #2', result2);
console.log('Result #3', result3);
