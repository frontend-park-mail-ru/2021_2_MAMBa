(function() {
    const noop = () => {};
    const AJAX_METHODS = {
        POST: 'POST',
        GET: 'GET',
    };

    class Ajax {
        ajaxGet(args) {
            return this.#ajax({method: AJAX_METHODS.GET, ...args});
        }

        ajaxPost(args) {
            return this.#ajax({method: AJAX_METHODS.POST, ...args});
        }

        #ajax({method = AJAX_METHODS.GET, url = '/', body = null, callback = noop}) {
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

        postFetch(args = {}) {
            let statusCode;

            return fetch(args.url, {
                method: AJAX_METHODS.POST,
                body: JSON.stringify(args.body),
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                statusCode = response.status;
                return response.json();
            }).then((parsedBody) => {
                return {
                    status: statusCode,
                    parsedBody
                };
            }).catch((response) => {
                console.log(`error ${response.status}`);
            })
        }

    window.Ajax = new Ajax();
})();