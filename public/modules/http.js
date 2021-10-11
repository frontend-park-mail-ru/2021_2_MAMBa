import { URLS } from '../consts/urls.js';
// import { getCSRFToken } from '../utils/utils';


const getCollections = async () => {
    const params = {
        url: URLS.api.collections,
        method: 'GET',
        credentials: 'include',
    };
    console.log(params);
    try {
        console.log("in getCollections");
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            console.log(responseBody);
            return responseBody;
        }
        return null;
    } catch (err) {
        console.log(err);
        console.log("you are not lucky error in GetRequest");
        return null;
    }
};

const sendRequest = async ({ url, method, body } = {}) => {
    // const headers = new Headers({
    //     'X-CSRF-TOKEN': getCSRFToken(),
    // });

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
        mode: 'cors',
        credentials: 'include',
    });

    try {
        const parsedJson = await response?.json();
        return {
            status: response.status,
            parsedJson,
        };
    } catch {
        return {
            status: response.status,
        };
    }
};

const getCurrentUser = async () => {
    const params = {
        url: URLS.api.me,
        method: 'GET',
        credentials: 'include',
    };
    console.log(params);

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (checkCSRFToken(responseBody)) {
            const successGetCSRF = await getCSRF();
            if (successGetCSRF) {
                return getCurrentUser();
            }
            return false;
        }
        if (responseStatus === 200) {
            return responseBody.id;
        }
        return null;
    } catch (err) {

        return null;
    }
};


export {
    getCollections,
    sendRequest,
    getCurrentUser,
};
