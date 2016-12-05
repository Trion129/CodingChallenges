var lexicon = new RiLexicon();

$('.generated').hide();

$("#generate").on('click',function(){
  var value = $('#sentence').val();
  var syllable = Math.floor(Math.random()*(6)+1);;
  console.log(syllable);
  if(value){
      $('.generated').html('<p>'+lexicon.randomWord("jjr",syllable)+" "+ value +'</p>');
  }
  else{
      $('.generated').html('<p>'+lexicon.randomWord("nn",syllable)+" "+lexicon.randomWord("jjr",syllable)+'</p>');
  }
  $('.generated').show();
});