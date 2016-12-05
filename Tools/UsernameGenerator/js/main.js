var lexicon = new RiLexicon();

$('.generated').hide();

$("#generate").on('click',function(){
  var value = $('#sentence').val();
  $('.generated').html('<p>'+lexicon.randomWord("nn",2)+" "+lexicon.randomWord("jjr",2)+'</p>');
  $('.generated').show();
});