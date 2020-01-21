document.addEventListener('DOMContentLoaded', function () {
    var Upgrade = document.getElementById('Upgradesale');  
    Upgrade.addEventListener('click', function() {
      google.payments.inapp.buy({
        'parameters': {
            'env': 'prod'
        },
        'sku': 'upgrade',
        'success': purchaseInfo => onPurchase(false, purchaseInfo),
        'failure': reason => onPurchase(true, reason)
    });
  })})