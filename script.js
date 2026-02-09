// Налаштування демо
const DEMO_DAYS = 3;
const STORAGE_KEY = "gmm_start_date";

let startDate = localStorage.getItem(STORAGE_KEY);
if (!startDate) {
    startDate = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, startDate);
}

const now = new Date();
const start = new Date(startDate);
const diffDays = (now - start) / (1000*60*60*24);

const priceEl = document.getElementById("price");
const modeEl = document.getElementById("mode");
const chartEl = document.getElementById("chart");

// Функція Buy / Sell
function buySilver() {
    alert("Demo Buy: You purchased silver!");
}
function sellSilver() {
    alert("Demo Sell: You sold silver!");
}

// Логіка ціни
if(diffDays < DEMO_DAYS) {
    modeEl.innerText = "Demo mode: Silver price ~120 USD";
    function updateDemoPrice() {
        const price = (120 + Math.random()*10).toFixed(2);
        priceEl.innerText = `$${price}`;
    }
    updateDemoPrice();
    setInterval(updateDemoPrice, 4000);

    // Простий графік демонстраційних цін
    let demoPrices = Array.from({length: 20}, ()=>120 + Math.random()*10);
    chartEl.innerHTML = "<canvas id='demoChart'></canvas>";
    const ctx = document.getElementById('demoChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: demoPrices.length}, (_,i)=>i+1),
            datasets: [{
                label: 'Silver Price (Demo)',
                data: demoPrices,
                borderColor: '#3ddc84',
                fill: false
            }]
        },
        options: { responsive: true }
    });

} else {
    modeEl.innerText = "Live market price (XAG/USD)";
    priceEl.innerText = "Live";

    // TradingView графік
    chartEl.innerHTML = `<iframe
        src="https://s.tradingview.com/widgetembed/?symbol=XAGUSD&interval=60&theme=dark"
        width="100%" height="500" frameborder="0" allowfullscreen>
    </iframe>`;
}
