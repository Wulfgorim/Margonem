
function changeTitleToPrevious() {
	document.title = "Margonem MMORPG";
}
//Walka info
setInterval(function() {
	if (g.battle) {
		for (var x in g.battle.f) {
			if (g.battle.f[x].name != hero.nick && !g.battle.f[x].npc) {
				var walka = new SpeechSynthesisUtterance();
				walka.text = 'Gracz o nicku' + g.battle.f[x].name + 'Cie bije';
				walka.lang = 'pl-PL';
				speechSynthesis.speak(walka);
        document.title = 'Walka' + g.battle.f[x].name;
			}
		}
	}
}, 2000);
//Wiadomosc info
g.chat.parsers.push(function(ch) {
	if (ch.k == 3 && ch.n != hero.nick) {
		var msg = new SpeechSynthesisUtterance();
		msg.text = ch.n + 'napisal: ' + ch.t;
		msg.lang = 'pl-PL';
		speechSynthesis.speak(msg);
		document.title = 'Masz wiadomosc od:' + ch.n;
	}
});
