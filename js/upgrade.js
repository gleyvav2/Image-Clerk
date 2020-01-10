document.addEventListener('DOMContentLoaded', function () {
    var Upgrade = document.getElementById('Upgradesale');  
    Upgrade.addEventListener('click', function() {
      google.payments.inapp.buy({
        'parameters': {
            'env': 'prod'
        },
        'sku': 'aochhbmlpoajkklegodlhegiebkabjmf',
        'success': purchaseInfo => onPurchase(false, purchaseInfo),
        'failure': reason => onPurchase(true, reason)
    });
  })})