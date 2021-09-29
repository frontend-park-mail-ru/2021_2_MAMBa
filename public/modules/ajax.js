(function() {
    const AJAX_METHODS = {
        POST: 'POST',
        GET: 'GET',
    };

    class Ajax {
      getFetch(args = {}) {
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
    }
    window.Ajax = new Ajax();
})();