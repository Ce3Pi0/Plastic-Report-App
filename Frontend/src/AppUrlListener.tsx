import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { App, URLOpenListenerEvent } from '@capacitor/app';


const AppUrlListener: React.FC = () => {

    const history = useHistory();

    useEffect(() => {
        App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {

            const domain = "3dfactory.mk";
            const slug = event.url.split(domain).pop();

            if (slug) {
                history.push(slug);
            }
        });
    }, []);

    return null;
};

export default AppUrlListener;