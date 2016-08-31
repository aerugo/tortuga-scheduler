'use strict'

import _ from 'lodash';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

/**
 * Storage utility. 
 *
 * @param {Any} key Storage key.
 * @return {Any} value Object to be stored.
 */
export const storage = {
    set: (key, value) => {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
        return value;
    },
    get: (key) => {
        let _data = localStorage.getItem(key);
        let _parsed = _.attempt(() => JSON.parse(_data));

        return _.isError(_parsed)
            ? _data
            : _parsed;
    }
}

/**
 * Headers should be attached to options.headers
 *
 * @param {String} method The HTTP method to make. Case-insensitive. Defaults to 'GET'.
 * @param {String} url Absolute or relative
 * @param {Object} data Data to pass as the body. Not required.
 * @param {Object} options An options object containing whatever else axajx(...) may use.
 * @param {Boolean} dataOnly Shuold only the data object be returned?
 * @return {Promise} -> {Any}
 */
function _request(method = 'GET', url, data, options = {}, dataOnly) {
    return new Promise((resolve, reject) => {
        const token = storage.get('token') || undefined;
        const defaultHeaders = !!token
            ? { Authorization: `Bearer ${token}`}
            : {}
        const headers = _.assign({}, defaultHeaders, options.headers);

        Vue.http(_.assign({}, options, {
            method: method,
            data: data,
            url: url,
            headers: headers,
        }))
        .then(
            (resp) => resolve(!!dataOnly ? resp.data : resp),
            (err) => reject(new Error(`${err.status}: ${err.statusText}`))
        );
    });
}

export const http = {
    get: (url, data, options, dataOnly = true) => {
        let _params;
        let _url = url;

        // Handle data
        if (_.isString(data)) {
            _params = data;
        } else if (_.isObject(data)) {
            _params = _.map(data, (value, key) => encodeURI([key, value].join('='))).join('&');
        }

        // Append *_params* if defined
        if (!_.isUndefined(_params)) {
            // Join either by ? or & depending on whether there already is a ? in the url
            _url += (/\?/.test(url) ? '&' : '?') + _params;
        }

        return _request('GET', _url, null, options, dataOnly);
    },
    post: (url, data, options, dataOnly = true) => _request('POST', url, data, options, dataOnly),
    put: (url, data, options, dataOnly = true) => _request('PUT', url, data, options, dataOnly),
    delete: (url, options, dataOnly = true) => _request('DELETE', url, null, options, dataOnly)
}

export default {
  http: http,
  storage: storage,
  request: _request
}