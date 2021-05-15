import Vue from 'vue'
import VueRouter from 'vue-router'
import ExecuteBot from "@/components/ExecuteBot";
import AddGmailAccount from "@/components/AddGmailAccount";
import store from "@/store";
import ListGmailAccounts from "@/components/ListBotJobs";

Vue.use(VueRouter)



const routes = [
    {
        path: '/',
        name: 'home',
        component: ListGmailAccounts,
        meta: {
            title: "List Jobs"
        }
    },
    {
        path: '/execute',
        name: 'execute',
        component: ExecuteBot,
        meta: {
            title: "Execute Bot"
        }
    },
    {
        path: '/gmail/add',
        name: 'gmail.account.add',
        component: AddGmailAccount,
        meta: {
            title: "Add Gmail Account"
        }
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    let nearestTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    if (nearestTitle) document.title = nearestTitle.meta.title;

    store.dispatch('listAccounts').then(() => {

        if(store.state.accounts.length >= 1 && store.getters.hasNoAccount) {
            store.dispatch('changeCurrentAccount', store.state.accounts[0]);
        }

        if(store.state.accounts.length === 0 && to.name !== 'gmail.account.add') {
            next({
                name: 'gmail.account.add'
            });
        }

    });

    next();
});

export default router
