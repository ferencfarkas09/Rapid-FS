"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FS = void 0;
var crypto = require("crypto");
var fs = require("fs");
var path = require("path");
/**
 *
 * Store and Read the content using the hash of that content (MD5)
 * @class FS
 * @param directory - Set the directory to read, e.g. /topdir
 */
var FS = /** @class */ (function () {
    function FS(directory) {
        this.directory = directory;
        this.fileMap = new Map();
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    }
    /**
     * Store content hash as file
     * @param filename - File name
     * @param content - Content to store as MD5 file name
     */
    FS.prototype.store = function (filename, content) {
        var hash = crypto.createHash('md5').update(content).digest('hex'); // Hashing file content
        var filePath = path.join(this.directory, hash); // File path where store
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
        }
        this.fileMap.set(filename, hash);
    };
    /**
     * Get the content hash from given file
     * @param filename - File name to read from given directory
     * @return hash - The hash from file or null
     */
    FS.prototype.get = function (filename) {
        try {
            var hash = this.fileMap.get(filename); // Read stored file
            if (hash) { // If file exists
                var filePath = path.join(this.directory, hash);
                if (fs.existsSync(filePath)) {
                    return fs.readFileSync(filePath, 'utf8');
                }
            }
        }
        catch (error) {
            console.error('File not found or no permission to read', error);
        }
        return null;
    };
    return FS;
}());
exports.FS = FS;
