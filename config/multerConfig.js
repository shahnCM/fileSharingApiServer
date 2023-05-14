// config.js
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    upload_file_size: process.env.UPLOAD_FILE_SIZE,
    upload_folder_path: process.env.FOLDER ?? 'default_uploads',
};