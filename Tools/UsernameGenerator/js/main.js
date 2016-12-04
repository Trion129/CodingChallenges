$("#generate").on('click',function(){
  var value = $('#sentence').val();
  
  
  $.getJSON('http://c10963cc.ngrok.io/name/'+ value, function(data){
    $('.generated').append('<p>'+data.data.name+'</p>');
  });
  
});