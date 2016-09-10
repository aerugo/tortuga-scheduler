'use strict'

import Vue from 'vue';
import VueRouter from 'vue-router';

// Use Vue router
Vue.use(VueRouter);

import components from './components/components'

/**
 * Vue Router uses an empty (or not...) components
 * as base rather than the a new Vue instance.
 */

const app = Vue.extend({});

const router = new VueRouter({
    history: false,
});

router.map({
    '/': {
        name: 'main',
        component: components.mainRoute,
    },
    '/admin': {
        name: 'admin',
        component: components.adminRoute,
    },
})

router.start(app, '#app-mount');

export default router;