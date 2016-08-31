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
    hashbang: false,
});

router.map({
    '/': {
        name: 'main',
        component: components.mainRoute,
    },
})

router.redirect({
  '*': '/',
});

router.start(app, '#app-mount');

export default router;