const buttons = document.querySelectorAll('.show-info-btn');

buttons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.stopPropagation(); // prevent closing instantly

    const priceBox = button.closest('.price-box');
    if (!priceBox) {
      console.error('Could not find parent .price-box');
      return;
    }

    const infoBox = priceBox.querySelector('.info-box');
    if (!infoBox) {
      console.error('Could not find .info-box inside price-box');
      return;
    }

    infoBox.classList.toggle('show');

    // Close other info-boxes
    document.querySelectorAll('.info-box').forEach(box => {
      if (box !== infoBox) {
        box.classList.remove('show');
      }
    });
  });
});

// Clicking outside closes info boxes
document.addEventListener('click', function() {
  document.querySelectorAll('.info-box').forEach(box => {
    box.classList.remove('show');
  });
});