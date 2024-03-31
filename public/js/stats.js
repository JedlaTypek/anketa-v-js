document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const sortBy = urlParams.get('sortBy');
    const order = urlParams.get('order');
    const nameContains = urlParams.get('nameContains');

    let link = document.getElementById('sortBy' + sortBy.charAt(0).toUpperCase() + sortBy.slice(1)).querySelector('[href]');
    link.classList.add('active')

    cancelNameContains.setAttribute('href', '?sortBy=' + sortBy + '&order=' + order);

    if(order === 'desc'){ // změň na order asc
        let href = link.getAttribute('href');
        href = href.replace("desc", "asc");
        link.setAttribute('href', href);
        link.classList.remove('desc');
        link.classList.add('asc');
    } else{ // změň na order desc
        let href = link.getAttribute('href');
        href = href.replace("asc", "desc");
        link.setAttribute('href', href);
        link.classList.remove('asc');
        link.classList.add('desc');
    }
    if(nameContains){
        let links = []
        document.querySelectorAll('[id^=sortBy]').forEach((element) => {
            links.push(element.querySelector('[href]'));
        });
        links.forEach((l) => {
            let href = l.getAttribute('href');
            href += "&nameContains=" + nameContains;
            l.setAttribute('href', href);
        })
    }
});

nameContains.addEventListener('input', () => {
    let href = nameContainsBtn.getAttribute('href');
    href = href.substring(0, href.lastIndexOf("=") + 1) + nameContains.value;
    nameContainsBtn.setAttribute('href', href)
})
