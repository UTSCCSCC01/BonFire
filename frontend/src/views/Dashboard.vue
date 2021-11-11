<template>
  <div>
    <h1 class="dashboard">
      My Dashboard
    </h1>
    <v-spacer />

    <div class="dashboard-statistics">
      <h1 class="analytics-title">
        Statistics
      </h1>
      <div class="chart-wrap">
        <div id="chart">
          <apexchart
            type="donut"
            width="380"
            :options="chartOptions"
            :series="stats"
          />
        </div>
      </div>
    </div>
    <v-divider
      inset
      class="dashboard-divider"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
	name: 'Dashboard',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      stats: [1, 1, 1],
      chartOptions: {
        labels: ["To Start", "In Progress", "Done"],

        chart: {
          width: 380,
          type: "donut",
        },
        dataLabels: {
          enabled: true
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: true
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 50,
          height: 290,
        }
      },
      
      
    };
  },
  mounted() {
			this.getUserAnalytics();
	},
  methods: {
    getUserAnalytics(){
      this.$http
        .get(`user/analytics`)
        .then(response => {
          this.stats = response.data.data;
          this.stats = [response.data.todoCount, response.data.inProgressCount, response.data.doneCount];
        })
    },
    appendData: function () {
      var arr = this.stats.slice()
      arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
      this.stats = arr
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-wrap {
  display: flex;
  justify-content: left;
  align-items: left;
  padding: 20px 20px;

}
.dashboard {
  font-family: Poppins;
  font-size: 45px;
  font-weight: bold;
  color: #3f3f3f;
  margin-bottom: 20px;
  text-align: left;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
	padding: 20px 30px;
}

.analytics-title {
  font-family: Poppins;
  font-size: 30px;
  color: #3f3f3f;
  margin-bottom: 20px;
  text-align: right;
  display: flex;
  align-items: center;
  padding: 0px 50px;

}
</style>
