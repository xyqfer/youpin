'use strict';

module.exports = async () => {
    const updateTechBlog = require('./updateTechBlog');
    const updateLiteratureBlog = require('./updateLiteratureBlog');
    const updateJpBlog = require('./updateJpBlog');
    const updateReading = require('./updateReading');

    try {
        await updateTechBlog();
        await updateLiteratureBlog();
        await updateJpBlog();
        // await updateReading();

        return {
            success: true
        };
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};