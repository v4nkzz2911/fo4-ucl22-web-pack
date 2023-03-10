import config from "config/app.js";
import cookie from 'js-cookie';

function checkStatus(response) {
    return response;
    /*if (response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;*/
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

export default async (url, method, options) => {
    var initOptions = {
        method: method !== undefined ? method : 'GET',
        credentials: 'include'
    }
    var headerOpts = !__DEV__ ? {
        headers: {
            'X-CSRFToken': cookie.get('csrftoken')
        }
    } : {}
    var opts = Object.assign(initOptions, headerOpts, options);

    if (url.indexOf("http") > -1) {
        url = url;
    } else {
        url = config.apiUrl + url;
    }

    const result = await fetch(url, opts)

    return await result.json()
}