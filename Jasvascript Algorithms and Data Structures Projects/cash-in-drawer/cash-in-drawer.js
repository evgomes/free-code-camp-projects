/**
 * Sums the total cash-in-drawer.
 * @param {Object} cid cash-in-drawer.
 * @returns {Number} total cash.
 */
function sumCashInDrawer(cid) {
    return +cid.reduce((prev, current) => prev + current[1], 0).toFixed(2);
}

/**
 * Cash-in-drawer function. Calculates the amount of coins we should return of each coin as exchange for a transaction, if possible.
 * @param {Number} price product price.
 * @param {Number} cash given cash as payment. 
 * @param {Array} cid 2D array showing the name of a coin and how many coins of this given name we have.
 * @returns {Object} transaction status and coins as exchange. 
 */
function checkCashRegister(price, cash, cid) {
    // First we need to know how much we have of cash-in-drawer
    const totalCashInDrawer = sumCashInDrawer(cid);

    // Then we need to know how much we should give in exchange
    let exchange = cash - price;

    // If we don't have enough money of cash-in-drawer, return the status of insufficient funds
    if (totalCashInDrawer < exchange) {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    // If the amount we have of cash-in-drawer is the same we need for exchange, we return 'CLOSED' as status with all items. 
    if (totalCashInDrawer === exchange) {
        return { status: 'CLOSED', change: [...cid] };
    }

    // We we'll need to check for values of each available coin.
    const bankNotesAndCoins = [
        { name: 'ONE HUNDRED', val: 100.00 },
        { name: 'TWENTY', val: 20.00 },
        { name: 'TEN', val: 10.00 },
        { name: 'FIVE', val: 5.00 },
        { name: 'ONE', val: 1.00 },
        { name: 'QUARTER', val: 0.25 },
        { name: 'DIME', val: 0.10 },
        { name: 'NICKEL', val: 0.05 },
        { name: 'PENNY', val: 0.01 }
    ];

    // Here we transform our array of cash-in-drawer into a readable object
    let drawer = {};

    for (let coin of cid) {
        Object.defineProperty(drawer, coin[0], {
            value: coin[1],
            enumerable: true,
            configurable: true,
            writable: true
        });
    }

    let transactionStatus = { status: 'OPEN', change: [] };

    for (let coin of bankNotesAndCoins) {
        let totalOfThisCoin = 0;

        // While we have money of the current coin in drawer and the exchange value is greater than or equals the coin value, we check this as 1 time to return
        while (drawer[coin.name] > 0 && exchange >= coin.val) {
            exchange -= coin.val;
            drawer[coin.name] -= coin.val;
            totalOfThisCoin++;

            // Here we round the exchange value to avoid problems when calculating values
            exchange = Math.round(exchange * 100) / 100;
        }

        // If we can return one or more of this coin as exchange
        if (totalOfThisCoin > 0) {
            transactionStatus.change.push([coin.name, coin.val * totalOfThisCoin]);
        }
    }

    // If the exchange value is still greater than zero, it means we don't have enough coins to give as exchange
    if (exchange > 0) {
        return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }

    return transactionStatus;

}

let result = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

console.log(JSON.stringify(result, null, 2));