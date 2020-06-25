import Vue from 'vue';
import Router from 'vue-router';

import PublicPage from '../components/PublicPage';
import BuergerPage from '../components/BuergerPage';
import MitarbeiterPage from '../components/MitarbeiterPage';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'publicpage',
            component: PublicPage
        },
        {
            path: '/buerger',
            name: 'buergerpage',
            component: BuergerPage
        },
        {
            path: '/mitarbeiter',
            name: 'mitarbeiterpage',
            component: MitarbeiterPage
        }
    ]
});

export default router