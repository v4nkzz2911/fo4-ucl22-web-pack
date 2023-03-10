import config from '../config/common'
import lang from '../lng'

const lng = lang[config.lng]

let isInteger = (number) => {
    let numberInt = parseInt(number)
    return numberInt == number
}

let isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const range = (start, end) => Array.from({
    length: (end - start + 1)
}, (v, k) => k + start);

const toObj = (array, key) => {
    var result = array.reduce(function(map, obj) {
        map[obj[key]] = obj;
        return map;
    }, {});

    return result;
}

const openModal = () => {
    $('body').addClass('modal-open');
    $('.modal-backdrop').show().addClass('show');
    $('#modal-rewards').show().addClass('show');
    return false;
}

const closeModal = (event) => {
    event.preventDefault();
    $('body').removeClass('modal-open');
    $('body').css('paddingRight', '0');
    $('.modal-backdrop').hide().removeClass('show');
    $('#modal-rewards').hide().removeClass('show');
    return false;
}

const secondsToTime = (secs) => {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}

const pagination = (items, page, per_page) => {

    var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}
const paginationAll = (items, per_page = 6) => {
    let total_pages = Math.ceil(items.length / per_page);
    let pagingItems = []
    if (total_pages >= 1) {
        for (let index = 1; index <= total_pages; index++) {
            let offset = (index - 1) * per_page
            let paginatedItems = items.slice(offset).slice(0, per_page)
            pagingItems.push(paginatedItems)
        }
    }

    return pagingItems
}
const showLogin = (event = false) => {
    if (event) {
        event.preventDefault()
    }

    Swal.fire({
        title: `<span>${lng.signIn}</span>`,
        'html': '<p><a href="/user/login?platform=1"><img src="/images/logo-garena.png" alt=""/></a></p>',
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
        customClass: {
            popup: 'popup-small'
        },
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        },
    }).then(res => res.value && (
        window.location = '/user/login/1'
    ))
}

const login = () => {
    window.location = '/user/login'
}

const showError = (code, title = lng.notice, btnTitle = lng.confirm) => {
    let errMsg = lng[code] ? lng[code] : (`${lng.defaultError} [${code}]`)

    if (code == 'no_account') {
        showDownload()
        return false
    }

    return Swal.fire({
        title: title,
        'html': '<p>' + errMsg + '</p>',
        confirmButtonText: btnTitle,
        showCloseButton: true,
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        },
        customClass: {
            popup: 'popup-small'
        },
    })
}

const showMessage = (message = '', btnCancel = null, title = lng.notice, btnConfirm = lng.confirm) => {

    return Swal.fire({
        title: title,
        'html': '<p>' + message + '</p>',
        showConfirmButton: btnConfirm ? true : false,
        confirmButtonText: btnConfirm,
        showCancelButton: btnCancel ? true : false,
        cancelButtonText: btnCancel,
        showCloseButton: true,
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        },
        customClass: {
            popup: 'popup-small'
        },
    })
}
const showResult = (message = '', btnCancel = null, title = lng.notice, btnConfirm = lng.confirm) => {

    return Swal.fire({
        title: title,
        'html': message,
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        },
        customClass: {
            popup: 'popup-result'
        },
    })
}
const showConfirm = (message = '', btnCancel = null, title = lng.notice, btnConfirm = lng.confirm) => {

    return Swal.fire({
        title: title,
        'html': '<p>' + message + '</p>',
        confirmButtonText: btnConfirm,
        showCancelButton: btnCancel ? true : false,
        cancelButtonText: btnCancel,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        },
        customClass: {
            popup: 'popup-small'
        },
    })
}
const showImage = (imgUrl, btnConfirm = '') => {
    return Swal.fire({
        title: "",
        'html': '<img src="' + imgUrl + '" alt="" class="popup-image"/>',
        showCloseButton: true,
        showConfirmButton: btnConfirm ? true : false,
        confirmButtonText: btnConfirm,
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        },
        customClass: {
            popup: 'popup-image'
        },
    })
}

const showDownload = () => {
    showMessage(`<p>You need to create a game account<br>to join the event</p><a href="${config.downloadUrl}" class="btn-download"><img src="/images/btn-download.png" alt="" class="gg-track-download"/></a>`, null, null, null)
}

const encryptLocation = (long, lat, key, iv) => {
    // convert text to bytes
    let text = JSON.stringify({
        long,
        lat
    })
    let textBytes = aesjs.utils.utf8.toBytes(text)

    const aesOfb = new aesjs.ModeOfOperation.ofb(key, iv)
    let encryptedBytes = aesOfb.encrypt(textBytes)

    // return encrypted data in hex
    return aesjs.utils.hex.fromBytes(encryptedBytes);
}
const request = async (url, method = 'GET', options) => {
    var initOptions = {
        method: method
    }
    var opts = Object.assign(initOptions, options);

    const result = await fetch(url, opts)

    return await result.json()
}

const convertDateForIos = (date) => {
    var arr = date.split(/[- :]/);
    date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    return date;
}
const format2digits = (number) => (
    number < 10 ? ('0' + number) : number
)
const getRandomNumber = (minimum, maximum) => {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
const getOrder = (index) => {
    let order = 0
    if (index >= 21 && index <= 24 || index <= 13 && index >= 7) {
        order = 25 - index
    }

    if (index >= 14 && index <= 20) {
        order = index - 9
    }

    if (index >= 1 && index <= 6) {
        order = index + 19
    }

    return order

}
const formatNumber = (num, demical = '.') => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + demical)
}
const formatKNumber = (num) => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + 'K';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + lng.million;
    } else if (num <= 900) {
        return num;
    }
}
const filterArray = (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
        // validates all filter criteria
        return filterKeys.every(key => {
            // ignores non-function predicates
            if (typeof filters[key] !== 'function') return true;
            return filters[key](item[key]);
        });
    });
}
const isFbBrowser = () => {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}
const youTubeId = (url) => {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}
const shuffleArray = (array) => {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

const groupBy = (arr = [], key = '') => {
    if (!key || !arr.length) return null;
    return arr.reduce((r, a) => {
        r[a[`${key}`]] = r[a[`${key}`]] || [];
        r[a[`${key}`]].push(a);
        return r;
    }, Object.create(null));
};

export default {
    isInteger,
    isJsonString,
    range,
    toObj,
    openModal,
    closeModal,
    secondsToTime,
    pagination,
    paginationAll,
    showError,
    showLogin,
    encryptLocation,
    showMessage,
    showResult,
    request,
    convertDateForIos,
    format2digits,
    showImage,
    getRandomNumber,
    getOrder,
    showConfirm,
    formatNumber,
    formatKNumber,
    filterArray,
    isFbBrowser,
    showDownload,
    youTubeId,
    login,
    shuffleArray,
    isMobile,
    groupBy,
}