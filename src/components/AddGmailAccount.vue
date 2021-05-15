<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" align="center" no-body>

      <b-card-header>
        <b-card-title class="text-center">Add Gmail Account</b-card-title>
      </b-card-header>

      <b-form @submit="submit">
        <b-card-body class="text-center">

          <b-alert variant="danger" :show="this.gotAnyAccount">{{ this.accountFlashMessage }}</b-alert>

          <b-form-group
              label="Gmail Email Address:"
              label-for="input-1">
            <b-form-input
                id="input-1"
                v-model="form.email.input"
                type="text"
                placeholder="Gmail Email Address"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group
              label="Gmail Email Password:"
              label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="form.password.input"
                type="password"
                placeholder="Gmail Email password"
                required
            ></b-form-input>
          </b-form-group>

          <b-alert :variant="form.error.variant" :show="form.error.show">{{ form.error.message }}</b-alert>

        </b-card-body>

        <b-card-footer>
          <b-button variant="success" type="submitForm" :disabled="isDisabled">
            Add Account
          </b-button>
        </b-card-footer>

      </b-form>

    </b-card>
  </div>
</template>

<script>
import Gmail from "@/api/Gmail";
import { mapGetters } from "vuex/dist/vuex.mjs";
export default {
  name: "AddGmailAccount",

  computed: {

    ...mapGetters({
      'gotAnyAccount': 'hasNoAccount',
      'accountFlashMessage': 'getAccountMessage',
    }),

    isDisabled() {
      return this.form.email.input.length === 0 || this.form.password.input.length === 0 || this.form.isLoading
    }

  },

  data() {

    return {

      form: {
        isLoading: false,
        error: {
          show: false,
          variant: 'danger',
          message: ''
        },

        email: {
          input: ''
        },

        password: {
          input: ''
        },

      }

    }

  },

  methods: {

    resetForm() {
      this.form.error.show = false;
      this.form.error.variant = 'danger';
      this.form.error.message = '';
    },

    submit(event) {
      event.preventDefault();
      this.form.isLoading = true;
      this.resetForm();

      Gmail.addAccount(this.form.email.input, this.form.password.input).then((response) => {

        let account = response.data;
        if(!this.gotAnyAccount) {
          this.$store.dispatch('changeCurrentAccount', account);
        }
        this.$store.dispatch('addAccountToList', account);

        this.form.isLoading = false;
        this.form.error.show = true;
        this.form.error.variant = 'success';
        this.form.error.message = 'account added successfully!';
      }).catch(error => {
        this.form.isLoading = false;
        if(error.response.status === 401) {
          this.form.error.show = true;
          this.form.error.message = error.response.data.detail;
        } else if(error.response.status === 400) {
          this.form.error.show = true;
          this.form.error.message = error.response.data.user[0];
        }
      });
    }

  }

}
</script>

<style scoped lang="scss">
</style>
