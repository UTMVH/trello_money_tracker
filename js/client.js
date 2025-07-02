// Trello Money Tracker Power-Up
window.TrelloPowerUp.initialize({
    'card-badges': function(t, options) {
        return t.get('card', 'shared', 'moneyTracker')
        .then(function(moneyData) {
            if (!moneyData || typeof moneyData.totalAmount !== 'number' || moneyData.totalAmount <= 0) {
                return [];
            }

            const badges = [];
            const totalAmount = moneyData.totalAmount || 0;
            
            // Main amount badge with better formatting
            try {
                badges.push({
                    text: `$${Math.round(totalAmount).toLocaleString('es-MX')} MXN`,
                    color: 'green'
                });

                // Payment status badge if we have payment percentage
                if (typeof moneyData.paymentsPercentage === 'number' && moneyData.paymentsPercentage > 0) {
                    const percentage = Math.round(moneyData.paymentsPercentage * 10) / 10; // Round to 1 decimal
                    
                    if (percentage >= 100) {
                        badges.push({
                            text: 'Pagado',
                            color: 'blue'
                        });
                    } else {
                        badges.push({
                            text: `${percentage}% Pagado`,
                            color: 'orange'
                        });
                    }
                }
            } catch (error) {
                console.error('Error creating badges:', error);
                // Return basic badge on error
                badges.push({
                    text: 'Money Tracker',
                    color: 'gray'
                });
            }

            return badges;
        })
        .catch(function(error) {
            console.error('Error loading money data for badges:', error);
            return [];
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