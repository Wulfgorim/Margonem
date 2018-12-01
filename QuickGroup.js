/*
  Autor: Wulfgorim,
  Dodatek: Quick Group z Filtrem.
*/
((_a, doc) => {
    $('<div id="GQ_CFG">Quick Group z Filtrem</div>').appendTo('#cfg_options').click(() => {
        if ($('#GQ_CFG').attr('style') == 'background-position: 0px -22px') {
            $('#GQ_CFG').attr('style', 'background-position: 0px 0px');
            switchStatus(false);
        } else {
            $('#GQ_CFG').attr('style', 'background-position: 0px -22px');
            switchStatus(true);
        }
    });
    config = function() {
        if (localStorage.getItem("QG_CFG") === null) {
            let _default = {
                toggled: false,
                curCfg: "Brak",
                configs: [{
                        short: "fr",
                        desc: "Przyjaciele"
                    },
                    {
                        short: "kl",
                        desc: "Klanowicze"
                    },
                    {
                        short: "kl-fr",
                        desc: "Klanowicze/Przyjaciele"
                    },
                    {
                        short: "all",
                        desc: "Wszyscy"
                    }
                ]
            };
            localStorage.setItem("QG_CFG", JSON.stringify(_default));
            return JSON.parse(localStorage.getItem("QG_CFG"));
        } else {
            return JSON.parse(localStorage.getItem("QG_CFG"));
        }
    }
    saveConfig = function(e) {
        localStorage.setItem("QG_CFG", JSON.stringify(e));
    }
    selectConfig = function(i) {
        let _config = config();
        _config.configs.forEach(cfg => {
            if (cfg.short == i) {
                _config.curCfg = i;
                saveConfig(_config);
                message(`Ustawiono tryb (${cfg.desc}), odświeżam!`);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    }
    toggledStatus = function() {
        let _config = config();
        return _config.toggled;
    }
    switchStatus = function(e) {
        let _config = config();
        _config.toggled = e;
        saveConfig(_config);
    }
    currentConfig = function() {
        let _config = config();
        return _config.curCfg;
    }
    confgDesc = function() {
        let _config = config();
        let ret = '';
        _config.configs.forEach(cfg => {
            if (_config.curCfg == cfg.short) {
                ret = cfg.desc;
            }
        });
        return ret;
    }
    drawAlert = function(t, c, clb) {
        let mainDiv = $("<div>").css({
            'display': 'flex',
            'justify-content': 'center',
            'flex-direction': 'column',
            'width': 'auto',
            'padding-bottom': '14px',
            'line-height': '40px',
            'align-items': 'center',
            'margin': '0 auto'
        });
        $(`<b>${t}</b>${c}`).appendTo(mainDiv);
        mAlert(mainDiv, 1, [function() {
            clb();
        }, false]);
    }
    loadCheckBoxInstance = function() {
        if (toggledStatus()) {
            $('#GQ_CFG').attr('style', 'background-position: 0px -22px');
        } else {
            $('#GQ_CFG').attr('style', 'background-position: 0px 0px');
        }
    }
    settings = function() {
        let _config = config(),
            list = '',
            title = `Tryb QG: ${confgDesc()}`;
        _config.configs.forEach(cfg => {
            list += `<option value="${cfg.short}">${cfg.desc}</option>`;
        });
        let c = `<select id="QG_TRYB">${list}</select>`;
        drawAlert(title, c, () => {
            var cfg = $("#QG_TRYB option:selected").attr("value");
            selectConfig(cfg);
        });
    }
    //Pozyczylem sobie funkcje od Adiego, bo nie chcialo mi sie pisac <3
    sendQuery = parameter => new Promise((resolve, reject) => {
        fetch(`/engine?t=${parameter}&ev=${g.ev}&browser_token=${g.browser_token}&aid=${g.aid}`, {
            method: 'POST',
            credentials: 'same-origin'
        }).then((data) => data.json()).then((data) => {
            g.ev = data.ev;
            return resolve(data);
        }).catch((err) => reject(err))
        g.ev += 0.01;
    });
    chunkArr = function(arr, n) {
        return arr.slice(0, (arr.length + n - 1) / n | 0).
        map(function(c, i) {
            return arr.slice(n * i, n * i + n);
        });
    }
    checkIfClan = async function() {
        let stat = false,
            nick = $(".a2 strong").text(),
            query = await sendQuery("clan&a=members"),
            members = chunkArr(query.members, 9);
        members.forEach(member => {
            let mnick = member[1];
            if (mnick == nick) stat = true;
        });
        return stat;
    }
    checkIfFriend = async function() {
        let stat = false,
            nick = $(".a2 strong").text(),
            query = await sendQuery("friends&a=show"),
            friends = chunkArr(query.friends, 10);
        friends.forEach(friend => {
            let frnick = friend[1];
            let online = friend[8];
            if (frnick == nick) stat = true;
        });
        return stat;
    }
    acceptParty = function(i) {
        if (i == true) $("#a_ok").click();
        if (i == false) $("#a_cancel").click();
    }
    $("#lagmeter").click(() => {
        if (!toggledStatus()) return;
        settings();
    });
    loadCheckBoxInstance();
    $(doc).keyup(function(e) {
        if (e.which == 75 && e.target.tagName != "TEXTAREA" && e.target.tagName != 'INPUT') {
            if (!toggledStatus()) return;
            for (let c in g.other) {
                const {
                    x,
                    y,
                    id,
                    relation,
                    clan
                } = g.other[c];
                if ((Math.abs(hero.x - x) <= 1 && Math.abs(hero.y - y) <= 1) && !isset(g.party[c])) {
                    switch (currentConfig()) {
                        case "fr":
                            if (relation == "fr")
                                _g("party&a=inv&id=" + id);
                            break;
                        case "kl":
                            if (relation == "cl" || relation == "cl-fr" || clan == hero.clanName)
                                _g("party&a=inv&id=" + id);
                            break;
                        case "kl-fr":
                            if (relation == "cl" || relation == "cl-fr" || relation == "fr")
                                _g("party&a=inv&id=" + id);
                            break;
                        case "all":
                            _g("party&a=inv&id=" + id);
                            break;
                    }
                }
            }
        }
    });
    init = function() {
        switch (currentConfig()) {
            case "fr":
                checkIfFriend().then(res => acceptParty(res));
                break;
            case "kl":
                checkIfClan().then(res => acceptParty(res));
                break;
            case "kl-fr":
                checkIfFriend().then(fr => {
                    return fr;
                }).then(fr => checkIfClan().then(cl => {
                    if (fr || cl) acceptParty(true);
                    if (!fr && !cl) acceptParty(false);
                }));
                break;
            case "all":
                acceptParty(true);
                break;
        }
    }
    mAlert = function(a, c, d, b) {
        _a(a, c, d, b);
        let one = "chcesz dołączyć do drużyny",
            two = "zaprasza cię do drużyny.";
        if (!toggledStatus()) return;
        if (a.constructor === String)
            if (a.includes(one) || a.includes(two)) {
                init();
            } else return message(a);
    };
})(mAlert, document);
