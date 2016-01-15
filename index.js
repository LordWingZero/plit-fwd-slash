function parseBreaks(target) {
    var responses = [];
    var innerC = 0;
    for (var i = 0; i < target.length; i++) {

        if (innerC > 0 && (innerC % 2 === 0)) {
            responses = _addOrAppend(responses, '/');
        }

        if (target[i] !== '/') {
            innerC = 0;
            responses = _addOrAppend(responses, target[i]);
        }

        // only one
        else if (target[i] === '/' && target[i - 1] !== '/' && target[i + 1] !== '/') {
            innerC = 0;
            if (target.length - 1 !== i) {
                responses.push('');
            }
        }

        // beginning one
        else if (target[i] === '/' && target[i - 1] !== '/' && target[i + 1] === '/') {
            innerC = 0;
            responses = _addOrAppend(responses, target[i]);
        }

        // middle one
        else if (target[i] === '/' && target[i - 1] === '/' && target[i + 1] === '/') {
            innerC++;
        }

        // end one
        else if (target[i] === '/' && target[i - 1] === '/' && target[i + 1] !== '/') {
            if (innerC > 0 && (innerC % 2 !== 0)) {
                responses.push('');
            }
            innerC = 0;
        }

    }
    return responses;
}

function _addOrAppend(responses, newChar) {
    if (responses.length === 0) {
        responses.push(newChar);
    }
    else {
        responses[responses.length - 1] = (responses[responses.length - 1] + newChar);
    }
    return responses;
}

module.exports = parseBreaks;