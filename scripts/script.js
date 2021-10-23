let money = parseInt(window.localStorage.getItem('money')) || 0;
let collection = window.localStorage.getItem('collection') ? JSON.parse(window.localStorage.getItem('collection')) : {common:[], shiny:[]};

const gatchaMachine = document.querySelector('.gatchaMachine');
const moneyHud = document.querySelector('.money');
let gatchaShakeRequired = 2;
let startedShaking = false;
const shakeGatchaMachine = () => {
    if (startedShaking || money >= 20 ) {
        if (!startedShaking) {
            startedShaking = true;
            money -= 20;
            updateMoney();
        }
        if (!gatchaMachine.classList.contains('shake') && !gatchaMachine.classList.contains('disappear')) {
            if (!gatchaShakeRequired) {
                revealGatchaBall();
                startedShaking = false;
                gatchaShakeRequired = 2;
            } else {
                gatchaMachine.classList.add('shake');
                gatchaShakeRequired--;
                setTimeout(() => {
                    gatchaMachine.classList.remove('shake');
                }, 500);
            }
        }
    } else {
        moneyHud.classList.add('blink');
        setTimeout(() => {
            moneyHud.classList.remove('blink');
        }, 500);
    }
}
gatchaMachine.addEventListener('click', shakeGatchaMachine);

const gatchaBall = document.querySelector('.gatchaBall');
const revealGatchaBall = () => {
    gatchaBall.classList.add('drop');
    setTimeout(() => {
        gatchaBall.classList.add('present');
        setTimeout(() => {
            gatchaBall.addEventListener('click', crackGatchaBall);
        }, 500);
        gatchaMachine.classList.add('disappear');
    }, 500);
}

const prize = gatchaBall.querySelector('.prize');
const crackGatchaBall = () => {
    if (!gatchaBall.classList.contains('crack')) {
        const winning = getRandomPrize();
        const winningShiny = isShiny();
        if (!collection[winningShiny ? 'shiny' : 'common'].includes(winning)) {
            collection[winningShiny ? 'shiny' : 'common'].push(winning);
            winningShiny ? updateShiny() : updateCommon();
        }
        prize.style.backgroundImage = `url('assets/prizes/${winning}')${winningShiny ? ', linear-gradient(140deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 20%, rgba(0,255,0,1) 40%, rgba(0,255,255,1) 60%, rgba(0,0,255,1) 80%, rgba(241,0,255,1) 100%)' : ''}`
        gatchaBall.classList.add('crack');
    }
}

const prizes = [
    'badger.gif',
    'bee.gif',
    'boomba.gif',
    'jenjen.gif',
    'drawn.gif',
    'mina.gif',
    'baba.gif',
    'dandy.gif',
    'waffo.gif',
    'rodziac.gif'
];
const getRandomPrize = () => prizes[Math.floor(Math.random() * prizes.length)];
const isShiny = () => Math.floor(Math.random() * 100) < 10;

const moneyIndicator = moneyHud.querySelector('.amount');
const updateMoney = () => {
    moneyIndicator.innerText = money;
    window.localStorage.setItem('money', money);
}
updateMoney();

const commonIndicator = document.querySelector('.collection .amount');
const commonMax = document.querySelector('.collection .maxAmount');
commonMax.innerText = prizes.length;
const updateCommon = () => {
    commonIndicator.innerText = collection.common.length;
    window.localStorage.setItem('collection', JSON.stringify(collection));
}
updateCommon();

const shinyIndicator = document.querySelector('.collectionShiny .amount');
const shinyMax = document.querySelector('.collectionShiny .maxAmount');
shinyMax.innerText = prizes.length;
const updateShiny = () => {
    shinyIndicator.innerText = collection.shiny.length;
    window.localStorage.setItem('collection', JSON.stringify(collection));
}
updateShiny();

const work = document.querySelector('.work');
work.addEventListener('click', () => {
    if (!work.classList.contains('bounce')) {
        money += 5;
        updateMoney();
        work.classList.add('bounce');
        setTimeout(() => {
            work.classList.remove('bounce');
        }, 500);
    }
});

const gameContainer = document.querySelector('.gameContainer');
const shop = document.querySelector('.shop');
shop.addEventListener('click', () => {
    gameContainer.classList.add('gatcha');
});

const exit = document.querySelector('.exit');
exit.addEventListener('click', () => {
    gameContainer.classList.remove('gatcha');
    gatchaMachine.classList.remove('disappear');
    prize.style.backgroundImage = '';
    gatchaBall.classList.remove('crack');
    gatchaBall.classList.remove('drop');
    gatchaBall.classList.remove('present');
});


const again = document.querySelector('.again');
again.addEventListener('click', () => {
    gatchaMachine.classList.remove('disappear');
    prize.style.backgroundImage = '';
    gatchaBall.classList.remove('crack');
    gatchaBall.classList.remove('drop');
    gatchaBall.classList.remove('present');
});
