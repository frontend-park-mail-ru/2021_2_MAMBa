import { URLS } from '../consts/urls.js';

import {
    arrayContentToActorPageContent
} from './adapters.js';
import {response} from "express";


const getInfoAboutActor = async (actorId) => {
    const params = {
        url: URLS.api.actor + actorId,
        method: 'GET',
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            // return arrayContentToActorPageContent(responseBody);
            return responseBody;
        }
        return null;
    } catch (err) {
        return null;
    }
};


const getCollections = async () => {
    const params = {
        url: URLS.api.collections,
        method: 'GET',
        credentials: 'include',
    };
    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
        if (responseStatus === 200) {
            return responseBody;
        }
        return null;
    } catch (err) {
        return null;
    }
};

const sendRequest = async ({ url, method, body } = {}) => {
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

const login = async (user) => {
    const params = {
        url: URLS.api.login,
        method: 'POST',
        body: user,
    };

    try {
        return response = await sendRequest(params);
    } catch (err) {
        return null;
    }
};

const getCurrentUser = async () => {
    const params = {
        url: URLS.api.me,
        method: 'GET',
        credentials: 'include',
    };

    try {
        const { status: responseStatus, parsedJson: responseBody} = await sendRequest(params);
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
    getInfoAboutActor,
    login,
};
