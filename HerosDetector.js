((_npc, doc) => {
	g.loadQueue.push({
		fun: () => {
			let s = doc.createElement('style'),
				style = `
					#mainFrame {
					  position: absolute;
					  z-index: 999;
					  top: 10px;
					  left: 10px;
					  border: 3px solid #753434;
					  min-width: 170px;
					  width: auto;
					  height: auto;
					  display: table;
					  background: url(img/console-back.jpg) no-repeat;
					  box-shadow: inset 0 0 0 100px #8209099c;
					}
					#alert_header {
					  padding: 4px;
					  height: 40px;
					  line-height: 20px;
					  margin-left: 10px;
					  margin-right: 10px;
					  text-align: center;
					  color: white;
					}
					#heros_name {
					  font-weight: bold;
					}
					#heros_lvl {
					  font-size: 14px;
					}
					#heros_img {
					  display: grid;
					  align-content: center;
					  justify-content: center;
					  padding: 10px;
					}
					#heros_location {
					  height: 20px;
					  padding: 4px;
					  line-height: 20px;
					  margin-left: 10px;
					  margin-right: 10px;
					  text-align: center;
					  color: white;
					}
					#alert_controls {
					  height: 35px;
					  display: flex;
					  justify-content: center;
					  align-items: center;
					}
					#alert_controls button {
					  margin: 3px;
					}
                `;
			s.type = 'text/css';
			s.appendChild(document.createTextNode(style));
			document.head.appendChild(s);
			drawPanel = function(npc) {
				let alert = `
					<div id="mainFrame">
					  <div id="alert_header">
						<div id="heros_name">${npc.nick}</div>
						<div id="heros_lvl">(${npc.lvl} lvl)</div>
					  </div>
					  <div id="heros_img">
						<img src="https://www.margonem.pl/obrazki/npc/${npc.icon}">
					  </div>
					  <div id="heros_location">(${npc.x}, ${npc.y})</div>
					  <div id="alert_controls">
						<button id="zawolaj">Zawołaj</button>
						<button id="close_frame">Zamknij</button>
					  </div>
					</div>
				`;
				let appendToCenterbox = $(alert).appendTo('#centerbox2');
				let zawolaj = document.getElementById("zawolaj");
				let zamknij = document.getElementById("close_frame");
				zawolaj.addEventListener("click", () => {
					let msg = `/k Zanalazłem herosa! ${npc.nick} na mapie: ${map.name} (${npc.x}, ${npc.y}).`;
					chatSend(msg);
				});
				zamknij.addEventListener("click", () => {
					$("#mainFrame").remove();
				});
			}
			newNpc = function(e) {
				for (var x in e) {
					if (e[x].wt > 79) drawPanel(e[x]);
				}
				_npc.call(this, e);
			}
		}
	})
})(newNpc, document);
