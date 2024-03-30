function findChecked(){
    let checkboxes = document.querySelectorAll('[name$="Check"]');
    let checked = []
    checkboxes.forEach((checkbox) => {
        if(checkbox.checked) checked.push(checkbox);
    })
    return checked;
}

function updateProfileCards(){
    checked = findChecked();
    checked.forEach((checkbox) => {
        let id = parseInt(checkbox.name);
        document.querySelector(`[name="${id}Money"]`).value = allMoney.value;
        document.querySelector(`[name="${id}Power"]`). value = allPower.value;
        document.querySelector(`[name="${id}Experience"]`).value = allExperience.value;
    })
}

function validate(){

}

allMoney.addEventListener('input', () => {
    updateProfileCards();
})

allPower.addEventListener('input', () => {
    updateProfileCards();
})

allExperience.addEventListener('input', () => {
    updateProfileCards();
})

oznacVse.addEventListener('change', () => {
    console.log('zmena');
    let checkboxes = document.querySelectorAll('[name$="Check"]');
    checkboxes.forEach(checkbox => checkbox.checked = oznacVse.value === 'true');
    oznacVse.value = oznacVse.value === 'true' ? 'false' : 'true';
});