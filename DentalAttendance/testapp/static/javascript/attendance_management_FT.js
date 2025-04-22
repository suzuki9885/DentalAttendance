
function showModal(actionType) {
    // ボタンの状態を確認
    fetch('/record_attendance_FT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action_type=${actionType}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'confirm') {
            document.getElementById('modalMessage').textContent = `${actionType}を記録しますか？`;
            document.getElementById('modalActionType').value = actionType;
            document.getElementById('confirmationModal').style.display = 'flex';
        } else if (data.status === 'invalid') {
            showErrorModal(actionType);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました。もう一度お試しください。');
    });
}

function showErrorModal(actionType) {
    const modal = document.getElementById('errorModal');
    const message = document.getElementById('errorMessage');
    
    switch(actionType) {
        case '出勤':
            message.textContent = 'すでに出勤済みです';
            break;
        case '退勤':
            message.textContent = 'すでに退勤済みです';
            break;
    }
    modal.style.display = 'flex';
    setTimeout(() => {
        closeErrorModal();
    }, 3000);
}

function closeErrorModal() {
    document.getElementById('errorModal').style.display = 'none';
}

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function showCompletionModal(actionType) {
    const modal = document.getElementById('completionModal');
    const title = document.getElementById('completionTitle');
    const message = document.getElementById('completionMessage');

    switch(actionType) {
        case '出勤':
            title.textContent = '出勤完了';
            message.textContent = '今日も1日頑張りましょう！';
            break;
        case '退勤':
            title.textContent = '退勤完了';
            message.textContent = '今日も1日お疲れ様でした！';
            break;
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        closeCompletionModal();
    }, 3000);
}

function closeCompletionModal() {
    document.getElementById('completionModal').style.display = 'none';
}

document.getElementById('confirmForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const actionType = document.getElementById('modalActionType').value;
    
    fetch('/confirm_attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action_type=${actionType}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            closeModal();
            showCompletionModal(actionType);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else if (data.status === 'error') {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました。もう一度お試しください。');
    });
});

// メニューを開く
document.querySelector('.detail-button').addEventListener('click', function() {
    document.querySelector('.navigation-menu').classList.add('active');
    fetchRecords();
});

// メニューを閉じる
document.querySelector('.close-menu').addEventListener('click', function() {
    document.querySelector('.navigation-menu').classList.remove('active');
});

// 今日の記録を取得して表示
function fetchRecords() {
    fetch('/get_todays_records')
        .then(response => response.json())
        .then(records => {
            const recordsList = document.getElementById('attendance-records');
            recordsList.innerHTML = '';
            
            if (records.length === 0) {
                recordsList.innerHTML = '<li>今日の記録なし</li>';
                return;
            }

            records.forEach(record => {
                const li = document.createElement('li');
                li.textContent = `　${record.action_type}　　${record.time}`;
                recordsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const recordsList = document.getElementById('attendance-records');
            recordsList.innerHTML = '<li>記録の取得に失敗しました</li>';
        });
}
