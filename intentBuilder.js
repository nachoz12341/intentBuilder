const fs = require('fs');
const uuid = require('uuid/v1');
const template = require('./intentTemplate.json');

const overwriteIntent = function(name, phrases) {
    let intent = JSON.parse(fs.readFileSync('./InputIntent/'+name+'.json'));
    phrases.forEach((phrase) => {
        addPhrase(intent,phrase);
    });

    return intent;
}

const buildNewIntent = function (name, phrases) {
    let intent = template;
    intent.id = uuid();
    intent.name = name;
    phrases.forEach((phrase) => {
        addPhrase(intent,phrase);
    });

    return intent;
}

const addPhrase = function(intent, phrase) {
    intent.userSays.push({
        "id": uuid(),
        "data": [
            {
            "text": phrase,
            "userDefined": false
            }
        ],
        "isTemplate": false,
        "count": 0,
        "updated": 0,
        "isAuto": false
    });
}

module.exports.overwriteIntent = overwriteIntent;
module.exports.buildNewIntent = buildNewIntent;
