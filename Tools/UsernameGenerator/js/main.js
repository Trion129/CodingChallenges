var lexicon = new RiLexicon();

$('.generated').hide();

$("#generate").on('click',function(){
  var value = $('#sentence').val();
  var syllable1 = Math.floor(Math.random()*(6)+1);
  var syllable2 = Math.floor(Math.random()*(6)+1);
  if(value){
      $('.generated').html('<p>'+lexicon.randomWord("jjr",syllable1)+" "+ value +'</p>');
  }
  else{
      $('.generated').html('<p>'+lexicon.randomWord("nn",syllable1)+" "+lexicon.randomWord("jjr",syllable2)+'</p>');
  }
  $('.generated').show();
});