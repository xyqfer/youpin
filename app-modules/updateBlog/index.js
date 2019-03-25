'use strict';

module.exports = async () => {
    const updateTechBlog = require('./updateTechBlog');
    const updateLiteratureBlog = require('./updateLiteratureBlog');
    const updateReading = require('./updateReading');

    try {
        await updateTechBlog();
        await updateLiteratureBlog();
        await updateReading();

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