<template>
  <div>
    <h1 class="dashboard">
      My Dashboard
    </h1>
    <v-spacer />

    <template class="dashboard-statistics; overflow-x: scroll;">
      <h1 class="analytics-title">
        Analytics
      </h1>
      <div class="d-flex">
        <div
          v-for="(stat, index) in boardStats"
          :key="stat.id"
        >
          <div v-if="boardsDisplay[index][2]">
            <v-btn
              class="board-title"
              :to="`/board/${boardsDisplay[index][0]}`"
            >
              {{ boardsDisplay[index][1] }}
            </v-btn>
            <div class="chart-wrap ">
              <div id="chart">
                <apexchart
                  type="donut"
                  width="380"
                  :options="chartOptions"
                  :series="stat"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    
    <v-divider
      inset
      class="dashboard-divider"
    />
    <h1 class="analytics-title">
      Aggregated Analytics
    </h1>
    <div class="chart-wrap">
      <div id="chart">
        <apexchart
          type="donut"
          width="600"
          :options="chartOptions"
          :series="aggregateStats"
        />
      </div>
    </div>
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
      boards: [],
      boardsDisplay: [],
      boardStats: [],
      aggregateStats: [1, 1, 1],
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
    this.getUserBoards();
    this.getUserAnalytics();
	},
  methods: {
    getUserBoards() {
      this.$http.get('boards')
      .then(res => {
        this.boards = res.data;
        this.boards.forEach(board => {
          this.$http.get(`user/analytics/board/${board.id}`)
          .then(response => {
            this.boardStats.push([response.data.todoCount, response.data.inProgressCount, response.data.doneCount]);
            this.boardsDisplay.push([board.id, board.title, response.data.totalCount]);
          })
          .catch(err => {
            console.log(err);
          });
        });
      })
      .catch(err => {
        console.error(err);
      })
    },
    getUserAnalytics(){
      this.$http
        .get(`user/analytics`)
        .then(response => {
          this.aggregateStats = [response.data.todoCount, response.data.inProgressCount, response.data.doneCount];
        })
    },
    appendData: function () {
      var arr = this.aggregateStats.slice()
      arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
      this.aggregateStats = arr
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

.board-title {
  font-family: Poppins;
  font-size: 20px;
  color: #3f3f3f;
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 0px 50px;
}
</style>
