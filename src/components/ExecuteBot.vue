<template>
  <div>
    <b-card bg-variant="dark" text-variant="white" align="center" no-body>

      <b-card-header>
        <b-card-title class="text-center">Execute a new job</b-card-title>
      </b-card-header>

      <b-form @submit="submitForm">
        <b-card-body class="text-center">

          <b-form-group
              label="Job Name (Optional):"
              label-for="input-1">
            <b-form-input
                id="input-1"
                v-model="form.job.nick_name.input"
                type="text"
                placeholder="Enter Job Nick Name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              label="Run Once:"
              label-for="input-2">
            <b-form-checkbox
                id="input-2"
                v-model="form.job.run_once.input"
                placeholder="Run Once Or Not"
                value="true"
            ></b-form-checkbox>
          </b-form-group>

          <b-form-group
              label="Black List keywords:"
              label-for="keywords">
            <small>Which found in body</small>
            <b-form-tags
                input-id="keywords"
                v-model="form.job.keywords.input"
                separator=" "
                placeholder="Enter Keywords"
                required
                remove-on-delete
            ></b-form-tags>
          </b-form-group>

          <div v-for="(field, position) in form.job.number_of_message_fields" :key="position"
               class="messages-groups-container">

            Enter Message for Reply No. {{ position + 1 }}

            <b-form-group class="messages-groups">
              <b-form-textarea
                  id="textarea-formatter"
                  v-model="field.message"
                  placeholder="Enter your Message."
                  required
              ></b-form-textarea>

              <b-form-group
                  label="Reply Delay After Message Sent:"
                  label-for="input-4">
                <b-form-input
                    id="input-4"
                    v-model="field.reply_delay"
                    placeholder="Reply Delay After Message Sent:"
                    type="number"
                    required
                ></b-form-input>
              </b-form-group>

              <b-form-file class="mt-1" accept="image/*" v-model="field.file"></b-form-file>

              <div class="d-flex justify-content-start mt-2" v-if="position !== 0">
                <b-button variant="danger" class="add-more-btn" @click="removeField(position)">
                  Remove
                </b-button>
              </div>

            </b-form-group>
          </div>

          <div class="d-flex justify-content-end">
            <b-button variant="info" class="add-more-btn" @click="addField">
              Add More
            </b-button>
          </div>

        </b-card-body>

        <b-card-footer>
          <b-button variant="danger" type="submit">
            Execute
          </b-button>
        </b-card-footer>

      </b-form>

    </b-card>
  </div>
</template>

<script>
import Bots from "@/api/Bots";

export default {
  name: "ExecuteBot",
  data() {
    return {
      form: {
        job: {
          nick_name: {
            input: ''
          },
          run_once: {
            input: false
          },
          reply_delay: {
            input: 0
          },
          keywords: {
            input: []
          },
          number_of_message_fields: [
            {
              number: 1,
              message: '',
              reply_delay: 0,
              file: null
            }
          ]
        }
      }
    }
  },

  methods: {

    submitForm: function (event) {
      event.preventDefault();
      Bots.runBot(this.form.job.nick_name.input,
          this.form.job.run_once.input,
          this.form.job.keywords.input,
          this.form.job.number_of_message_fields
      ).then(res => {
        console.log(res);
        this.$router.push({
          name: 'home'
        });
      });
    },

    removeField: function (position) {
      this.form.job.number_of_message_fields.splice(position, 1)
    },

    addField: function () {
      let lastNumber = this.form.job.number_of_message_fields.length;

      this.form.job.number_of_message_fields.push({
        number: (lastNumber + 1),
        reply_delay: 0,
        message: '',
        file: null
      })
    }
  },

}
</script>

<style scoped lang="scss">
</style>
