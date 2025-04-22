
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const admId = document.getElementById('admId').value;
    const password = document.getElementById('passwordField').value;

    // 管理者IDとパスワードのチェック
    fetch('/check_adm_id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            adm_id: admId,
            adm_password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                if (data.error === '管理者IDが異なります。') {
                    document.getElementById('admId').setCustomValidity(data.error);
                    document.getElementById('admId').reportValidity();
                } else if (data.error === 'パスワードが異なります。') {
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
document.getElementById('admId').addEventListener('input', function () {
    this.setCustomValidity('');
});

document.getElementById('passwordField').addEventListener('input', function () {
    this.setCustomValidity('');
});

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