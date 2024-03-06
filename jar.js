function increaseAmount(amount) {
    var currentAmount = parseInt(document.querySelector('.money-input-contenteditable').innerText);
    var newAmount = currentAmount + amount;
    document.querySelector('.money-input-contenteditable').innerText = newAmount;
}

function updateTotalAmount() {
    var totalAmount = parseFloat(localStorage.getItem('savedAmount')) || 0;
    var statsValueElements = document.querySelectorAll('.stats_data_value');
    var statsGoalValue = parseFloat(document.querySelector('.stats_goal_value').textContent.replace(/\D/g, ''));

    if (totalAmount >= statsGoalValue) {
        localStorage.setItem('savedAmount', 0);
        totalAmount = 0;
    }

    statsValueElements.forEach(function(element) {
        element.textContent = totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ') + ' ₴';
    });
}

// Оновлюємо загальну суму при завантаженні сторінки
window.onload = updateTotalAmount;

// Функція для обробки кнопок оплати
function handlePaymentButtonClick(paymentMethod) {
    var addedAmount = parseFloat(document.querySelector('.money-input-contenteditable').innerText.replace(/\D/g, ''));
    var existingAmount = parseFloat(localStorage.getItem('savedAmount')) || 0;
    var totalAmount = existingAmount + addedAmount; // Обчислюємо загальну суму
    var name = document.getElementById('cardHolder').value;
    var comment = document.getElementById('comment').value;

    console.log("Спосіб оплати: " + paymentMethod);
    console.log("Сума: " + addedAmount);
    console.log("Ім'я: " + name);
    console.log("Коментар: " + comment);

    // Зберігаємо нову суму у localStorage
    localStorage.setItem('savedAmount', totalAmount);

    // Оновлюємо загальну суму
    updateTotalAmount();

    // Очищення полів введення
    document.querySelector('.money-input-contenteditable').innerText = '0';
    document.getElementById('cardHolder').value = '';
    document.getElementById('comment').value = '';
}
document.addEventListener('DOMContentLoaded', function () {
    const moneyInputContentEditable = document.querySelector('.money-input-contenteditable');
    const moneyInputBlock = document.querySelector('.money-input-block');
    const moneyInputSubtitle = document.querySelector('.money-input-subtitle');
  
    moneyInputContentEditable.addEventListener('input', function () {
      const value = parseFloat(this.innerText.trim());
  
      if (value < 10 || value > 29999) {
        moneyInputBlock.classList.add('incorrect');
        moneyInputSubtitle.classList.remove('hidden');
      } else if (value == 0) {
        moneyInputBlock.classList.add('empty');
        moneyInputBlock.classList.remove('incorrect');
        moneyInputSubtitle.classList.add('hidden');
      } else {
        moneyInputBlock.classList.remove('empty');
        moneyInputBlock.classList.remove('incorrect');
        moneyInputSubtitle.classList.add('hidden');
      }
    });
  });







