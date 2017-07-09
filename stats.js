var axOnlineWorld = 'Aldous';

$('<div id="axOnlineList" style="display:none;"></div>').appendTo('body');

function axGetOnline(){
  $.ajax({
    url: 'https://crossorigin.me/http://www.margonem.pl/?task=stats',
    success: function(j){
    $('#axOnlineList').html(j);
      $('#lagmeter').click(function(){
        $('body').append($('#online_'+axOnlineWorld).css('zIndex', 999).show());
      });
    }
  });
}

axGetOnline();
setInterval(axGetOnline, 60*1000);