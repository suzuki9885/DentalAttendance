document.getElementById('employmentType').addEventListener('change', function() {
    const employeeIdField = document.getElementById('employeeId');
    const selectedType = this.value;
    if (selectedType) {
        employeeIdField.value = selectedType;
    }
});

function togglePasswordVisibility(fieldId, button) {
    const passwordField = document.getElementById(fieldId);
    const icon = button.querySelector('i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
} 

function showConfirmation(event) {
    event.preventDefault();
                
    // パスワードの一致チェック
    const password = document.getElementById('passwordField').value;
    const confirmPassword = document.getElementById('confirmPasswordField');
                
    if (password !== confirmPassword.value) {
        confirmPassword.setCustomValidity('パスワードが異なります');
        confirmPassword.reportValidity();
        return;
    }
    
    confirmPassword.setCustomValidity('');

    // 従業員IDの重複チェック
    const employeeId = document.getElementById('employeeId').value;
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
        if (data.exists) {
            document.getElementById('employeeId').setCustomValidity('既に存在している従業員IDです');
            document.getElementById('employeeId').reportValidity();
            return;
        }
    
        // フォームの値を取得
        document.getElementById('confirmName').textContent = document.getElementById('name').value;
        document.getElementById('confirmEmploymentType').textContent = document.getElementById('employmentType').value;
        document.getElementById('confirmEmployeeId').textContent = document.getElementById('employeeId').value;
    
        // パスワードを＊で表示
        document.getElementById('confirmPassword').textContent = '＊'.repeat(password.length);

        // モーダルを表示
        var modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();
    });
}

// パスワード入力時にバリデーションをリセット
document.getElementById('confirmPasswordField').addEventListener('input', function() {
    this.setCustomValidity('');
});

// 従業員ID入力時にバリデーションをリセット
document.getElementById('employeeId').addEventListener('input', function() {
    this.setCustomValidity('');
});

function submitForm() {
    // フォームを送信
    const form = document.getElementById('accountForm');
    form.submit();
         
    // 送信ボタンを無効化して二重送信を防止
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 送信中...';
}