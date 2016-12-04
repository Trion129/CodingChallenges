var lexicon, poemText, curString, curScheme;
var rhymeLearner = {
    sentenceStruct: {},
    length: 0,
    rhymingSchemes: {},
    schemeLength: 0
};

function setup() {
    noCanvas();
    lexicon = new RiLexicon();
}

function createData() {
    poemText = $('textarea').val();
    poemText = poemText.replace(/[,;\.:!?]+/g, '');
    var poemSentences = poemText.split('\n');
    var lastWords = [];

    for (var i = 0; i < poemSentences.length; i++) {
        curString = new RiString(poemSentences[i]);
        curWords = curString.words();
        lastWord = curWords[curWords.length - 1];

        if (rhymeLearner.sentenceStruct[curString.pos()] === undefined) {
            rhymeLearner.sentenceStruct[curString.pos()] = 1;
            rhymeLearner.length++;
        } else {
            rhymeLearner.sentenceStruct[curString.pos()]++;
        }
        lastWords.push(lastWord);
    }

    curScheme = 0;
    var rhymingScheme = {};
    var schemeNotation = '';

    for (var i = 0; i < lastWords.length; i++) {
        if (rhymingScheme[0] === undefined) {
            rhymingScheme[0] = lastWords[0];
            schemeNotation += '0';
            curScheme++;
        } else {
            var rhymed = undefined;
            for (var j = 0; j < curScheme; j++) {
                console.log(lastWords[i], rhymingScheme[j]);
                console.log(lexicon.isRhyme(lastWords[i], rhymingScheme[j]));
                if (lexicon.isRhyme(lastWords[i], rhymingScheme[j])) {
                    rhymed = j;
                    break;
                }
            }
            if (rhymed === undefined) {
                rhymingScheme[curScheme] = lastWords[i];
                schemeNotation += curScheme;
                curScheme++;
            } else {
                schemeNotation += rhymed;
            }
        }
    }



    if (rhymeLearner.rhymingSchemes[schemeNotation] === undefined) {
        rhymeLearner.rhymingSchemes[schemeNotation] = 1;
        rhymeLearner.schemeLength++;
    } else {
        rhymeLearner.rhymingSchemes[schemeNotation]++;
    }
}

function createPoem() {
  var weightedArray = [];
  for(x in rhymeLearner.rhymingSchemes){
    var times = rhymeLearner.rhymingSchemes[x];
    while(times--)
      weightedArray.push(x);
  }
  var choice = Math.floor(Math.random() * weightedArray.length);
  var rhymingScheme = weightedArray[choice];
  var rhymeSequence = rhymingScheme.split('');

  var lastWords = {};

  //Select the sentence formats
  for(var i = 0;i < rhymeSequence.length;i++){
    weightedArray = [];
    for(x in rhymeLearner.sentenceStruct){
      var times = rhymeLearner.sentenceStruct[x];
      while(times--)
        weightedArray.push(x);
    }
    var choice = Math.floor(Math.random() * weightedArray.length);
    var sentenceStruct = weightedArray[choice].split(',');

    var sentence = '';
    for(var j = 0;j < sentenceStruct.length - 1;j++){
      sentence += lexicon.randomWord(sentenceStruct[j]) + ' ';
    }
    if(lastWords[rhymeSequence[i]] === undefined){
      var word = lexicon.randomWord(sentenceStruct[sentenceStruct.length - 1]);
      lastWords[rhymeSequence[i]] = word;
      sentence += word+' ';

    }
    else{
      var word = lexicon.rhymes(lastWords[rhymeSequence[i]]) || lexicon.randomWord(sentenceStruct[sentenceStruct.length - 1]);
      if(Array.isArray(word)){
        var choice = Math.floor(Math.random() * word.length);
        word = word[choice];
      }
      sentence += word+ ' ';
    }
    createSpan(sentence);
    createSpan('<br>');
  }
}

$('#insert').on('click', function() {
    createData();
})

$('#generate').on('click', function(){
  createPoem();
})
