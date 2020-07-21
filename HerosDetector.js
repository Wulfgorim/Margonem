HerosDetector = new(function(self = this) {
    class HerosAlert {
        constructor(npc) {
            this.npc = npc;
            this.alert = {
                main: document.createElement('div'),
                header: document.createElement('div'),
                name: document.createElement('div'),
                lvl: document.createElement('div'),
                imgWrapper: document.createElement('div'),
                img: document.createElement('img'),
                location: document.createElement('div'),
                controls: document.createElement('div'),
                callout: document.createElement('button'),
                close: document.createElement('button')
            }
        }
        draw() {
            Object.assign(this.alert.main.style, {
                position: 'absolute',
                zIndex: '499',
                top: '5px',
                left: '5px',
                border: '3px solid #753434',
                minWidth: '170px',
                width: 'auto',
                height: 'auto',
                display: 'table',
                background: 'url(img/console-back.jpg) no-repeat',
                ['box-shadow']: 'inset 0 0 0 100px #8209099c',
                ['-moz-box-shadow']: 'inset 0 0 0 100px #8209099c',
                ['-webkit-box-shadow']: 'inset 0 0 0 100px #8209099c',
                ['-ms-box-shadow']: 'inset 0 0 0 100px #8209099c',
                ['-o-box-shadow']: 'inset 0 0 0 100px #8209099c'
            });
            Object.assign(this.alert.header.style, {
                padding: '4px',
                height: '40px',
                lineHeight: '20px',
                marginLeft: '10px',
                marginRight: '10px',
                textAlign: 'center',
                color: 'white'
            });
            Object.assign(this.alert.name.style, {
                fontWeight: 'bold'
            });
            Object.assign(this.alert.lvl.style, {
                fontSize: '14px'
            });
            Object.assign(this.alert.imgWrapper.style, {
                display: 'grid',
                alignContent: 'center',
                justifyContent: 'center',
                padding: '10px'
            });
            Object.assign(this.alert.location.style, {
                height: '20px',
                padding: '4px',
                lineHeight: '20px',
                marginLeft: '10px',
                marginRight: '10px',
                textAlign: 'center',
                color: 'white'
            });
            Object.assign(this.alert.controls.style, {
                height: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center'
            });
            [this.alert.callout, this.alert.close].forEach(e => {
                Object.assign(e.style, {
                    margin: '4px',
                    height: '20px',
                    border: 'none',
                    background: '#804668',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '11px'
                });
            });

            this.alert.name.innerHTML = this.npc.nick;
            this.alert.lvl.innerHTML = `(${this.npc.lvl} lvl)`;
            this.alert.img.src = `https://www.margonem.pl/obrazki/npc/${this.npc.icon}`;
            this.alert.location.innerHTML = `(${this.npc.x}, ${this.npc.y})`;

            this.alert.callout.innerHTML = "Zawołaj";
            this.alert.close.innerHTML = "Zamknij";

            this.alert.header.appendChild(this.alert.name);
            this.alert.header.appendChild(this.alert.lvl);
            this.alert.imgWrapper.appendChild(this.alert.img);
            this.alert.controls.appendChild(this.alert.callout);
            this.alert.controls.appendChild(this.alert.close);

            this.alert.main.appendChild(this.alert.header);
            this.alert.main.appendChild(this.alert.imgWrapper);
            this.alert.main.appendChild(this.alert.location);
            this.alert.main.appendChild(this.alert.controls);


            document.querySelector('#centerbox2').appendChild(this.alert.main);
            this.events();
        }
        events() {
            this.alert.callout.addEventListener('click', () => {
                chatSend(`/k Znalazłem herosa! ${this.npc.nick} na mapie: ${map.name} (${this.npc.x}, ${this.npc.y})`);
          		this.alert.main.remove();
            });
            this.alert.close.addEventListener('click', () => {
                this.alert.main.remove();
            });
        }
    }

    this.newNpc = newNpc;
    newNpc = npcs => {
        if (isset(npcs)) {
            for (const npc of Object.values(npcs)) {
                if (isset(npc.nick) && npc.wt > 79 && npc.wt <= 99) {
                    new HerosAlert(npc).draw();
                }
            }
        }
        self.newNpc.call(this, npcs);
    }
});
