(g => {
    window._g = (e, x) => {
        if (e === 'fight&a=f') {
            mAlert('Czy aby na pewno chcesz włączyć szybką walkę?', 2, [function() {
                g(e, x);
            }, function() {
                document.querySelector('#autobattleButton').style.display = 'block';
            }]);
            return;
        }
        g(e, x);
    }
})(window._g);
