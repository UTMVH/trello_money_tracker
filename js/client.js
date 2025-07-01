// Trello Money Tracker Power-Up
window.TrelloPowerUp.initialize({
    'card-badges': function(t, options) {
        return t.get('card', 'shared', 'moneyTracker')
        .then(function(moneyData) {
            if (!moneyData || !moneyData.totalAmount) {
                return [];
            }

            const badges = [];
            const totalAmount = moneyData.totalAmount || 0;
            
            // Main amount badge
            badges.push({
                text: `$${totalAmount.toLocaleString('es-MX')} MXN`,
                color: 'green',
                icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/icons/currency-dollar.svg'
            });

            // Payment status badge if we have payment percentage
            if (moneyData.paymentsPercentage !== undefined && moneyData.paymentsPercentage > 0) {
                const paidAmount = (totalAmount * moneyData.paymentsPercentage) / 100;
                const owedAmount = totalAmount - paidAmount;
                
                if (moneyData.paymentsPercentage >= 100) {
                    badges.push({
                        text: 'Pagado',
                        color: 'blue',
                        icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/icons/check-circle.svg'
                    });
                } else {
                    badges.push({
                        text: `${moneyData.paymentsPercentage}% Pagado`,
                        color: 'orange',
                        icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/icons/clock.svg'
                    });
                }
            }

            return badges;
        });
    },

    'card-buttons': function(t, options) {
        return [{
            icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/icons/currency-dollar.svg',
            text: 'Money Tracker',
            callback: function(t) {
                return t.popup({
                    title: 'Money Tracker MXN',
                    url: './money-tracker.html',
                    height: 400
                });
            }
        }];
    },

    'board-buttons': function(t, options) {
        return [{
            icon: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/icons/graph-up.svg',
            text: 'Money Report',
            callback: function(t) {
                return t.popup({
                    title: 'Board Money Report',
                    url: './money-report.html',
                    height: 600
                });
            }
        }];
    }
});

// Utility functions for money calculations
window.MoneyTracker = {
    // Parse money input (handles various formats)
    parseMoneyInput: function(input) {
        if (!input) return 0;
        
        // Remove currency symbols and spaces
        const cleanInput = input.toString().replace(/[$,MXN\s]/g, '');
        
        // Convert to number
        const amount = parseFloat(cleanInput);
        
        return isNaN(amount) ? 0 : Math.round(amount * 100) / 100; // Round to 2 decimal places
    },

    // Format money for display
    formatMoney: function(amount) {
        return `$${amount.toLocaleString('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} MXN`;
    },

    // Calculate payment details
    calculatePayments: function(totalAmount, paymentsPercentage) {
        const percentage = Math.max(0, Math.min(100, paymentsPercentage || 0));
        const paidAmount = Math.round((totalAmount * percentage) / 100 * 100) / 100;
        const owedAmount = Math.round((totalAmount - paidAmount) * 100) / 100;
        
        return {
            total: totalAmount,
            percentage: percentage,
            paid: paidAmount,
            owed: owedAmount
        };
    },

    // Get all cards data for board reports
    getBoardMoneyData: function(t) {
        return t.cards('all')
        .then(function(cards) {
            const promises = cards.map(card => {
                return t.get(card.id, 'shared', 'moneyTracker')
                .then(function(moneyData) {
                    return {
                        card: card,
                        moneyData: moneyData || {}
                    };
                });
            });
            
            return Promise.all(promises);
        });
    }
}; 