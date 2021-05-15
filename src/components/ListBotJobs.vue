<template>
  <div>
    <b-table
        :striped="true"
        :bordered="true"
        :dark="true"
        :outlined="true"
        :sortable="true"
        :busy="busy"
        :items="table.data"
        :fields="fields" show-empty empty-text="There are no jobs found for this account.">

      <template #empty="scope">
        <div class="text-center">
          <h4>{{ scope.emptyText }}</h4>
        </div>
      </template>

      <template #table-busy>
        <div class="text-center">
          <b-spinner type="grow" style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
        </div>
      </template>

      <!--      <template #cell(view)="data">-->
      <!--        <div class="d-flex flex-column justify-content-center">-->
      <!--          <router-link :to="{ name: 'bots.xing.view', params: {id: data.item.id} }" class="btn btn-outline-light">-->
      <!--            View-->
      <!--          </router-link>-->
      <!--        </div>-->
      <!--      </template>-->

      <template #cell(delete)="data">
        <div class="d-flex flex-column justify-content-center">
          <button @click="deleteBot(data.item.id)" class="btn btn-outline-danger">Delete</button>
        </div>
      </template>

    </b-table>
  </div>
</template>

<script>
import Bots from "@/api/Bots";
import {humanize} from "@/lib/humandate";

export default {
  name: "ListGmailAccounts",
  data() {
    return {
      fields: [{
        key: 'id',
        label: 'ID',
        sortable: true
      },
        {
          key: 'job_name',
          label: 'Job Name'
        },
        {
          key: 'run_once',
          label: 'Run Once',
          sortable: true
        },
        'is_done_running',
        'created_at',
        {
          key: 'delete', label: 'Delete Bot'
        }
      ],
      table: {
        data: [],
      },
      busy: true,
    }
  },
  methods: {
    getData() {
      return Bots.listJobs().then(res => {
        this.busy = false;
        this.table.data = res.data.map(obj => {
          obj.created_at = humanize(obj.created_at);
          obj.updated_at = humanize(obj.updated_at);
          return obj;
        });
      })
    },

    deleteBot(id) {
      Bots.deleteJob(id).then(() => {
        this.table.data.splice(this.table.data.indexOf(this.table.data.find(ele => ele.id === id)), 1);
        // this.$bvToast.toast('');
      });
    }
  },
  mounted() {
    this.getData();
    this.$root.$on('accountUpdated', () => {
      this.getData();
    });
  }
}
</script>

<style scoped>

</style>