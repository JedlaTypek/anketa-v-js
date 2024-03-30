document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const sortBy = urlParams.get('sortBy');
    const order = urlParams.get('order');

    link = document.getElementById('sortBy' + sortBy.charAt(0).toUpperCase() + sortBy.slice(1)).querySelector('[href]');
    link.classList.add('active')

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
});
