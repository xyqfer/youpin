const setCookie = require('set-cookie-parser');
let { http } = require('app-libs');
http = http.defaults({
    jar: true,
    followRedirect: false,
    resolveWithFullResponse: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Referer: 'https://leetcode-cn.com/',
    },
});

module.exports = async (req, res) => {
    const user = process.env.LEETCODE_NAME;
    const pwd = process.env.LEETCODE_PWD;
    const loginUrl = 'https://leetcode-cn.com/accounts/login/';

    const res1 = await http.get({
        uri: loginUrl,
    });
    let { csrftoken } = setCookie.parse(res1, {
        map: true,
    });

    const res2 = await http.post({
        uri: loginUrl,
        form: {
            csrfmiddlewaretoken: csrftoken,
            login: user,
            password: pwd,
        },
        headers: {
            'X-CSRFToken': csrftoken,
        },
    });
    csrftoken = setCookie.parse(res2, {
        map: true,
    }).csrftoken;

    const res3 = await http.get({
        uri: 'https://leetcode-cn.com/api/problems/all/',
        headers: {
            'X-CSRFToken': csrftoken,
        },
        json: true,
        resolveWithFullResponse: false,
    });
    const problemList = res3.stat_status_pairs;
    const finishedProblems = problemList.reverse().reduce((acc, item, index) => {
        if (item.status === 'ac') {
            acc.push({
                index,
                level: item.difficulty.level,
                questionId: item.stat.question_id,
                questionTitle: item.stat.question__title,
                questionDisplayId: item.stat.frontend_question_id,
            });
        }
        return acc;
    }, []);

    res.json({
        success: true,
        data: {
            total: problemList.length,
            finishedProblems,
        },
    });
};
