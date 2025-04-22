// ログインフォームの送信
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
                
    const employeeId = document.getElementById('employeeId').value;
    const password = document.getElementById('passwordField').value;
                
    // 従業員IDとパスワードのチェック
    fetch('/check_employee_id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            employee_id: employeeId,
            password: password
            })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            if (data.error === '存在しない従業員IDです') {
                document.getElementById('employeeId').setCustomValidity(data.error);
                document.getElementById('employeeId').reportValidity();
            } else if (data.error === 'パスワードが異なります') {
                document.getElementById('passwordField').setCustomValidity(data.error);
                document.getElementById('passwordField').reportValidity();
                }
        } else {
            // バリデーションが通った場合はフォームを送信
            this.submit();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// 入力時にバリデーションをリセット
document.getElementById('employeeId').addEventListener('input', function() {
    this.setCustomValidity('');
});

document.getElementById('passwordField').addEventListener('input', function() {
    this.setCustomValidity('');
});

// パスワード表示
function passwordView() {
    const passwordField = document.getElementById('passwordField');
    const toggleButton = document.querySelector('.toggle-password i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.classList.remove('fa-eye');
        toggleButton.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleButton.classList.remove('fa-eye-slash');
        toggleButton.classList.add('fa-eye');
    }
}