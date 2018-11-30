
/*
    Autor: Wulfgorim - https://www.margonem.pl/?task=profile&id=3671626
    Dodatek: AlliesChat
    Opis: Pozwala na pisanie z sojusznymi klanami za pomoca komendy /s.
    Użycie: 
    1) W clans podmien ID klanow z ktorymi chcesz miec kontakt
    2) Wejdz na strone https://www.pubnub.com/.
    3) Storz nowy projekt, nazwij jak chcesz.
    4) Wygeneruj publishKey i subscribeKey.
    5) Podmien z demo na wygenerowane.
	Wygląd: https://i.gyazo.com/45a1e71b4cde6bd2a95ff4c363251dcf.mp4
    Informacje: Jest to surowy dodatek, wiec nie ma żadnych zabezpieczeń,
    więc na upratego ktoś może sobie wysyłać wiadomości pod innym nickiem. (O ile wie jak).
    Ale generalnie sie sprawdza.
*/

$.getScript("https://cdn.pubnub.com/sdk/javascript/pubnub.4.0.11.min.js", (d) => {
  let pubnub = new PubNub({
      publishKey: 'demo',
      subscribeKey: 'demo'
    }),
    config = {
      channel: "sojusznicy",
      clans: [3630, 6720]
    }
  function addMessage(e) {
    $(`
      <div>
        <span style="cursor: pointer; color: #00dad0;" tip="Sojusznik" c_nick="${e.author}">Â«${e.author}Â» </span>
        <span>${e.msg}</span>
      </div>  
    `).appendTo("#chattxt");
  }
  pubnub.addListener({
    message: function(obj) {
      let msgObj = obj.message;
      addMessage(msgObj);
    }
  });
  pubnub.subscribe({
    channels: [config.channel]
  });
  (msg => {
    chatSendMsg = function(a) {
      if (config.clans.includes(hero.clan)) {
        let cmd = a.substring(0, 2);
        if (cmd == "/s") {
          let arr = a.split(cmd).map(s => s.trim()),
            msg = arr[1];
          pubnub.publish({channel : config.channel, message: {author: hero.nick, msg: msg}});
        }
      }
      msg(a);
    }
  })(chatSendMsg);
});
