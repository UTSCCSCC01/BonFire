<template>
  <div scroll>
    <h1 class="header">
      My Dashboard
    </h1>
    <v-spacer />
    <h1 class="title">
      Upcoming Tasks
    </h1>
    <v-data-table
      :headers="headers"
      :items="formatedDueDates"
      :items-per-page="5"
      class="elevation-1"
    />
    
    <div class="main-container">
      <div class="aggregated-analytics">
        <h1 class="title">
          Aggregated Analytics
        </h1>
        <v-container class="d-flex">
          <div v-if="aggregateStats.length>0">
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
          <div v-else>
            <p
              style="text-center; font-family: Poppins; color: #808080"
            >
              Not enough data to display
            </p>
          </div>
        </v-container>
      </div>
      <div
        class="personal-boards-analytics"
      >
        <h1 class="title">
          Personal Board Analytics
        </h1>
        
        <v-container
          id="table-scroll"
          class="d-flex"
        >
          <div
            v-if="boardsDisplay.length>0"
            class="d-flex"
          >
            <div
              v-for="(stat, index) in boardStats"
              :key="stat.id"
            >
              <v-container v-if="boardsDisplay[index][2]">
                <v-btn
                  class="board-title"
                  :to="`/board/${boardsDisplay[index][0]}`"
                >
                  {{ boardsDisplay[index][1] }}
                </v-btn>
                <div
                  id="chart"
                  class="chart-wrap"
                >
                  <apexchart
                    type="donut"
                    width="380"
                    :options="chartOptions"
                    :series="stat"
                  />
                </div>
              </v-container>
            </div>
          </div>
          <div v-else>
            <p
              style="text-center; font-family: Poppins; color: #808080"
            >
              Not enough data to display
            </p>
          </div>
        </v-container>
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
      aggregateStats: [],
      upcomingDueDates: [],
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
          height: 0,
        }
      },
      headers: [
        {
          text: "Card Name",
          align: "start",
          value: "card_title",
        },
        { text: "Campfire", value: "board_title" },
        { text: "Due Date", value: "due_date" },
        { text: "Days left", value: "days_left" },
      ],
      
    };
  },
  computed: {
    formatedDueDates() {
      return this.upcomingDueDates.map((upcomingDueDate) => {
        upcomingDueDate.due_date = this.formatDate(new Date(upcomingDueDate.due_date));
        return upcomingDueDate;
      });
    },
  },
  mounted() {
    this.getUserBoards();
    this.getUserAnalytics();
    this.getUpcomingDueDates();
	},
  methods: {
    formatDate(date) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
    getUserBoards() {
      this.$http.get('boards')
      .then(res => {
        this.boards = res.data;
        this.boards.forEach(board => {
          this.$http.get(`/boards/${board.id}/analytics`)
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
    getUpcomingDueDates(){
    this.$http.get('user/upcoming-due-dates')
    .then(res => {
      this.upcomingDueDates = res.data;
    })
    .catch(err => {
      console.error(err);
    })
  },

  },
}
</script>

<style lang="scss" scoped>
.chart-wrap {
  display: flex;
  justify-content: left;
  padding: 20px 0px;
  top:10px;

}
.header {
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

.title {
  font-family: Poppins;
  font-size: 30px;
  color: #3f3f3f;
  margin: 20px;
  display: flex;
  padding: 0px 50px;
}

.board-title {
  font-family: Poppins;
  font-size: 20px;
  color: #3f3f3f;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 0px 50px;
}
.main-container {
  display: flex;
  width: 50%;
  height: 75%;
  max-height: 75%;
}
.aggregated-analytics {
  flex: 0 1 50%;
  min-height: 100%;
  max-width: 50%;
  padding: .5em;
}
.personal-boards-analytics {
  flex: 0 1 50%;
  min-height: 100%;
  max-width: 50%;
  padding: .5em;
  left: 200px;
  align-items: flex-start;
  position:relative;

}
</style>
