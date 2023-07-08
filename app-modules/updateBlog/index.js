'use strict';

module.exports = async () => {
    // const updateTechBlog = require('./updateTechBlog');
    const updateLiteratureBlog = require('./updateLiteratureBlog');

    try {
        // await updateTechBlog();
        setTimeout(() => {
        //   updateLiteratureBlog();
        }, 4 * 60 * 1000);

        return {
            success: true,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
