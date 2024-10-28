"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBytes = formatBytes;
function formatBytes(bytes) {
    const GB = 1024 * 1024 * 1024;
    const MB = 1024 * 1024;
    if (bytes >= GB) {
        return (bytes / GB).toFixed(2) + ' GB';
    }
    else {
        return (bytes / MB).toFixed(2) + ' MB';
    }
}
