for(var i = 0;i < 20;i++){
    $('div[spellcheck=true]').innerHTML += 'Lets see if it can happen';
}
var e = new KeyboardEvent('keypress', {'key': 13});
$('div[spellcheck=true]').dispatchEvent(e);
