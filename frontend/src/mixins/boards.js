export default {
  data() {
    return {
      board: {},
      editBoardDialog: false,
      states: [],
      newState: false,
      newClass: false,
      stateName: '',
      newCard: false,
      card: {},
      menu: false,
    };
  },
  methods: {
    saveBoard(data) {
      this.board = data;
    },
    showNewCard(state) {
      this.card = {
        state,
      }
      this.newCard = true;
    },
    removeStateCard(card) {
      const state = this.states.find(state => state.id === card.state_id);
      state.cards = state.cards.filter(stateCard => stateCard.id !== card.id);
    },
    moveCard(e) {
      console.log({ e });
      const event = e.added || e.moved;
      if (event) {
        const newState = this.states.find(state => state.cards.find(card => card.id === event.element.id));
        this.updateCardState(event.element.id, newState.id, event.newIndex);
      }
    },
    updateCardState(card_id, state_id, order) {
      this.$http.put(`/boards/${this.boardId}/reorder-cards`, { card_id, state_id, order })
        .then(res => {
          console.log({ res })
        }).catch(err => {
          console.error({ err });
        });
    },
    createCard() {
      this.newCard = false;
      this.card.state_id = this.card.state.id;
      delete this.card.state;

      if (this.card.due_date) {
        let date = this.card.due_date.split('-');
        this.card.due_date = new Date(date[0], date[1] - 1, date[2]).toISOString()
      }

      this.$http.post('cards', this.card)
        .then(res => {
          this.$notify({
            type: "success",
            title: "Successfully Create a new card",
          });

          this.states.find(state => state.id == res.data.state_id).cards.push(res.data);
        })
        .catch(err => {
          this.$notify({
            type: "error",
            title: "Failed to create card",
            text: `Failed to create ${this.card.title}`,
          });
          console.error(err);
        })
        .finally(() => {
          this.card = {};
        })
    },
    createState() {
      this.$http.post('states', { board_id: this.boardId, title: this.stateName })
        .then(res => {
          this.$notify({
            type: "success",
            title: "Successfully Create a new state",
          });
          this.states.push({ cards: [], ...res.data });
          this.reorganizeStates();
        })
        .catch(err => {
          this.$notify({
            type: "error",
            title: "Failed to create state",
            text: `Failed to create ${this.stateName}`,
          });
          console.error(err);
        })
        .finally(() => {
          this.stateName = '';
          this.newState = false;
        })
    },
    reorganizeStates() {
      this.states.sort((a, b) => {
        if (a.type === 'TODO') return -1;
        if (a.type === 'DONE') return 1;

        if (b.type === 'TODO') return 1;
        if (b.type === 'DONE') return -1;

        return a.order - b.order;
      })
    },
    orderChange(event) {
      if (['TODO', 'DONE'].includes(this.states[event.moved.newIndex].type) ||
        ['TODO', 'DONE'].includes(this.states[event.moved.oldIndex].type)) {
        this.$notify({
          type: "error",
          title: "Can't reorder fixed states",
          text: "You can't move the TODO or DONE states",
        });
        this.reorderStates(event.moved.oldIndex, event.moved.newIndex);
        return;
      }
      this.$http.put(`boards/${this.boardId}/reorder-states`, event.moved)
        .then(() => {
          this.$notify({
            type: "success",
            title: "Reorganized states",
          });
        })
        .catch(err => {
          this.reorderStates(event.moved.oldIndex, event.moved.newIndex);
          console.error(err);
        })
    },
    reorderStates(oldIndex, newIndex) {
      let moved = this.states.splice(newIndex, 1);
      this.states.splice(oldIndex, 0, moved[0]);
    },
    getStates() {
      this.$http.get(`boards/${this.boardId}/states?include=cards`)
        .then(res => {
          this.states = res.data;
          this.states.forEach(state => {
            if (!state.cards) this.$set(state, 'cards', []);
            state.cards = state.cards.filter(card => {
              if (!card?.assignment?.id) return true;
              return card?.assignment?.published_date ? new Date(card.assignment.published_date).getTime() < new Date().getTime() : true
            });
          });

          this.reorganizeStates();
        })
        .catch(err => {
          console.error(err);
        })
    },
    getBoardInfo() {
      this.$http.get(`boards/${this.boardId}`)
        .then(res => {
          this.board = res.data;
        })
        .catch(err => {
          console.error(err);
        })
    },
    deleteState(state) {
      let confirmation = confirm(`Are you sure you want to delete state ${state.title}`);

      if (confirmation) {
        this.$http.delete(`states/${state.id}`)
          .then(() => {
            this.states = this.states.filter(s => s.id != state.id);
            this.$notify({
              type: "success",
              title: "Successfully deleted state",
            });
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
  },
}
