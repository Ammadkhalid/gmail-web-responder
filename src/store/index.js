import Vuex from "vuex";
import Vue from "vue";
import HttpClient from "@/api/HttpClient";

Vue.use(Vuex);


let store = new Vuex.Store({
    state: {
        currentAccount: {
          id: null,
          user: null,
          password: null,
          updated_at: null,
          created_at: null,
        },
        currentAccountId: null,
        accounts: []
    },
    mutations: {
        listAccounts(state, accounts) {
            state.accounts = accounts
        },
        changeCurrentAccount(state, account) {
            localStorage.setItem('user.id', account.id);
            localStorage.setItem('user.user', account.user);
            localStorage.setItem('user.password', account.password);
            localStorage.setItem('user.updated_at', account.updated_at);
            localStorage.setItem('user.created_at', account.created_at);

            state.currentAccountId = account.id;
            state.currentAccount = account;
        },
        addAccountToList(state, account) {
            state.accounts.push(account);
        },
        deleteAccount(state, account) {
            localStorage.removeItem('user.id');
            localStorage.removeItem('user.user');
            localStorage.removeItem('user.password');
            localStorage.removeItem('user.updated_at');
            localStorage.removeItem('user.created_at');

            state.accounts.filter(((value, index) => {
                if(value.pk === account.pk) {
                    state.accounts.splice(index);
                }
            }));
        }
    },
    actions: {
      listAccounts({commit}) {
          return HttpClient.get('gmail/account/list').then(response => {
              commit('listAccounts', response.data);
          });
      },
      changeCurrentAccount({commit}, account) {
          commit('changeCurrentAccount', account);
      },
      addAccountToList({commit}, account) {
          commit('addAccountToList', account);
      },
      deleteAccount({commit}, account) {
          commit('deleteAccount', account);
      },
    },
    getters: {
        hasNoAccount: state => {
            return state.accounts.length === 0;
        },
        getAccountMessage: state => {
            return state.accounts.length === 0 ? 'Please At least add one account first.' : '';
        },
        getAccounts: state => {
            return state.accounts;
        },
        currentAccountId: () => {
          return localStorage.getItem('user.id') || null;
        },
        currentAccount: () => {
            return {
                id: localStorage.getItem('user.id') || null,
                user: localStorage.getItem('user.user') || null,
                password: localStorage.getItem('user.password') || null,
                updated_at: localStorage.getItem('user.updated_at') || null,
                created_at: localStorage.getItem('user.created_at') || null,
            };
        }
    }
});

export default store;