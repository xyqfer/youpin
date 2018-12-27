'use strict';

module.exports = async () => {
    const updateTechBlog = require('./updateTechBlog');
    const updateLiteratureBlog = require('./updateLiteratureBlog');

    try {
        await updateTechBlog();
        await updateLiteratureBlog();

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