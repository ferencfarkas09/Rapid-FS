import {FS} from "./fs.class";


const fs = new FS("topdir");

// Store


fs.store("filename1", "a very long string1")
fs.store("filename2", "a very long string1")
fs.store("filename3", "a very long string3")


// Read
const result1 = fs.get("filename1")// gets 'a very long string1'
const result2 = fs.get("filename2")// gets 'a very long string1'
const result3 = fs.get("filename3")// gets 'a very long string3'

console.log('Result #1', result1)
console.log('Result #2', result2)
console.log('Result #3', result3)
