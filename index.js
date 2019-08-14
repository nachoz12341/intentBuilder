const fs = require('fs');
const intentBuilder = require('./intentBuilder');

const processInputFile = function(name) {
    let phrases = fs.readFileSync('./TrainingPhrases/'+name+'.txt');
    phrases = phrases.toString('utf8').replace(/\r/g,'').split('\n');

    let intent = {};
    if(fs.existsSync('./InputIntent/'+name+'.json'))
        intent = intentBuilder.overwriteIntent(name,phrases);
    else
        intent = intentBuilder.buildNewIntent(name,phrases);

    fs.writeFileSync('./OutputIntent/'+name+'.json',JSON.stringify(intent));
}

let files = fs.readdirSync('./TrainingPhrases');

files.forEach( (file) => {
    processInputFile(file.replace('.txt',''));
});