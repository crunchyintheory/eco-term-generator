const terms = [
    [
        'scarcity',
        'need',
        'want',
        'capital',
        'consumer',
        'service',
        'value',
        'utility',
        'labor',
        'production',
        'entrepeneurial',
        'consumerism',
        'economy',
        'human',
        'demand',
        'supply',
        'market',
        'product',
        'socialism',
        'communism',
        'privatization',
        'government',
        'voluntary',
        'involuntary',
        'profit',
        'revenue',
        'cost',
        'income',
        'worker',
        'job',
        'marginal',
        'fiscal',
        'alternative',
        'progressive',
        'regressive',
        'aggregate',
        'monopolistic',
        'comparative',
        'fixed',
        'variable'
    ],
    [
        'cost',
        'possibilities',
        'economy',
        'labor',
        'trade-off',
        'interdependence',
        'consumer',
        'demand',
        'market',
        'factors',
        'product',
        'exchange',
        'income',
        'wage',
        'utility',
        'deficit',
        'surplus',
        'monopoly',
        'equity',
        'asset'
    ],
    [
        'curve',
        'function',
        'economy',
        'per capita',
        'privatization',
        'vouchers',
        'motive',
        'appropriation',
        'stabilizer',
        'dividend',
        'venture',
        'yield'
    ]
];

const currentIndexes = [];

function randomTerm(set) {
    const rnd = Math.floor(Math.random() * terms[set].length);
    currentIndexes[set] = rnd;
    return terms[set][rnd];
}

function genTerm() {
    let firstTerm = randomTerm(0),
        secondTerm,
        thirdTerm;
    
    while(true) {
        const useSecond = !!Math.round(Math.random());
        if(useSecond) {
            secondTerm = randomTerm(1);
            if(secondTerm == firstTerm) continue;

            const useThird = !Math.floor(Math.random() * 5);
            if(useThird) {
                thirdTerm = randomTerm(2);
                if(thirdTerm == firstTerm || thirdTerm == secondTerm) continue;
            } else if(!Math.floor(Math.random() * 10)) {
                thirdTerm = 'of production';
                currentIndexes[2] = -1;
            }
        }
        else {
            secondTerm = randomTerm(2);
            if(secondTerm == firstTerm) continue;
        }
        break;
    }

    let word = `${firstTerm} ${secondTerm}`;
    if(thirdTerm) {
        word += ` ${thirdTerm}`;
    }

    return word;
}

function recallTerm() {
    if(!'URLSearchParams' in window) return false;

    const params = new URLSearchParams(window.location.search);
    if(!params.has('t')) return false;

    const data = atob(params.get('t')).split(',');
    if(data.length != 3) return false;

    let term = [];
    data.forEach((x, i) => {
        if(x == -1 && i == 2) {
            term[i] = 'of production';
        } else {
            term[i] = terms[i][x];
        }
    });
    term = term.join(' ');

    assignNewTerm(term);
    return true;
}

//DOM functions

function assignNewTerm(term) {
    if(!term) {
        term = genTerm();
    }
    document.getElementById('random-term').innerText = term;

    if(!'URLSearchParams' in window) return;
    
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const termb64 = btoa(currentIndexes.join(','));
    params.set('t', termb64);
    document.querySelector('#url input').value = `${baseUrl}?${params.toString()}`;
}

function showURL() { // eslint-disable-line no-unused-vars
    let el = document.getElementById('url');
    el.className = el.className.replace(' hidden', '');
}

function hideURL() { // eslint-disable-line no-unused-vars
    let el = document.getElementById('url');
    if(!el.className.includes('hidden')) {
        el.className += ' hidden';
    }
}

function copyURL() { // eslint-disable-line no-unused-vars
    const el = document.querySelector('#url input');
    console.log(el);
    
    el.select();

    document.execCommand('copy');
}

function clear() { // eslint-disable-line no-unused-vars
    window.location.href = window.location.origin + window.location.pathname;
}

//Run on load

if(!'URLSearchParams' in window) {
    document.querySelector('#showurl').remove();
}

if(!recallTerm()) {
    assignNewTerm();
}