<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="shadow">
      <b-navbar-brand :to="{ name: 'home' }">Gmail Responder Bot</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'execute' }">Run Job</b-nav-item>
          <b-nav-item-dropdown :text="user">

            <div v-for="(account, index) in getAccounts" :key="index">
              <b-dropdown-item :active="account === currentAccount" @click="changeAccount(account)">{{ account.user }}</b-dropdown-item>
            </div>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item :to="{ name: 'gmail.account.add' }">Add New Account</b-dropdown-item>
            <b-dropdown-item @click="deleteUserAccount(currentAccount)" v-if="!hasNoAccount">Delete Current Account</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Gmail from "@/api/Gmail";

export default {
  name: "Header",
  data() {
    return {
      user: null,
    }
  },
  computed: {
    ...mapGetters([
       'getAccounts',
       'currentAccount',
       'hasNoAccount'
    ])
  },
  mounted() {
    this.user = this.currentAccount.user;
  },
  methods: {
    ...mapActions([
        'changeCurrentAccount',
        'deleteAccount'
    ]),
    changeAccount: function (account) {
      this.user = account.user;
      this.changeCurrentAccount(account);
      this.$root.$emit('accountUpdated');
    },

    deleteUserAccount: function (account) {
      Gmail.deleteAccount(account.id).then((res) => {

        console.log(res);
        this.deleteAccount(account);
        let length = this.getAccounts.length - 1;
        if(length > 0) {
          this.changeCurrentAccount(this.getAccounts[length]);
        } else {
          this.user = '';
          this.$router.push({
            name: 'gmail.account.add'
          })
        }

      });
    },

  }
}
</script>

<style scoped lang="scss">
.bot-options {
  .p {
    margin-left: auto;
    color: black;
  }
}


</style>