import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

/**
 *
 * Store and Read the content using the hash of that content (MD5)
 * @class FS
 * @param directory - Set the directory to read, e.g. /topdir
 */
export class FS {
    private readonly directory: string;
    private fileMap: Map<string, string>;

    constructor(directory: string) {
        this.directory = directory;
        this.fileMap = new Map<string, string>();
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, {recursive: true});
        }
    }

    /**
     * Store content hash as file
     * @param filename - File name
     * @param content - Content to store as MD5 file name
     */
    store(filename: string, content: string): void {

        const hash = crypto.createHash('md5').update(content).digest('hex'); // Hashing file content
        const filePath = path.join(this.directory, hash); // File path where store

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
        }

        this.fileMap.set(filename, hash);
    }

    /**
     * Get the content hash from given file
     * @param filename - File name to read from given directory
     * @return hash - The hash from file or null
     */
    get(filename: string): string | null {
        try {
            const hash = this.fileMap.get(filename); // Read stored file

            if (hash) { // If file exists
                const filePath = path.join(this.directory, hash);

                if (fs.existsSync(filePath)) {
                    return fs.readFileSync(filePath, 'utf8');
                }
            }
        } catch (error: any) {
            console.error('File not found or no permission to read', error);
        }

        return null;
    }
}
