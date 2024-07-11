document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    const output = document.getElementById('output');
    let currentOperation = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.textContent;

            if (value==='C'){
                output.textContent = '';
                currentOperation = '';
            }

            else if (value === '=') {
                try {
                    output.textContent = eval(currentOperation);
                    currentOperation = output.textContent;
                } catch (e) {
                    output.textContent = 'Erro';
                    currentOperation = '';
                }
            } else {
                currentOperation += value;
                output.textContent = currentOperation;
            }
        });
    });
});
