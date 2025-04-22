
function showDeleteConfirmation(userId, userName, employmentType, employeeId) {
    // モーダルに情報を設定
    document.getElementById('deleteConfirmName').textContent = userName;
    document.getElementById('deleteConfirmEmploymentType').textContent = employmentType;
    document.getElementById('deleteConfirmEmployeeId').textContent = employeeId;

    // 削除フォームのactionを設定
    document.getElementById('deleteForm').action = `/delete_account/${userId}`;

    // モーダルを表示
    var modal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    modal.show();
}
