(function() {
  const noop = () => {
  };
  const AJAX_METHODS = {
    POST: 'POST',
    GET: 'GET',
  };

  class Ajax {
    getCollectionsFetch(args = {}) {
      let statusCode;

      return fetch(args.url, {
        method: AJAX_METHODS.GET,
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        statusCode = response.status;
        return response.json();
      }).then((parsedBody) => {
        return {
          status: statusCode,
          parsedBody,
        };
      }).catch((parsedBody) => {
        console.log('aaaaaa');
      });
    }

    ajaxPost(args) {
      return this._ajax({method: AJAX_METHODS.POST, ...args});
    }

    _ajax({
      method = AJAX_METHODS.GET,
      url = '/', body = null, callback = noop,
    }) {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        callback(xhr.status, xhr.responseText);
      });

      if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
      }

      xhr.send();
    }
  }

  window.Ajax = new Ajax();
})();

