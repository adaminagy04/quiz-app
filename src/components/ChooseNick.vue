<template>
  <div class="players-nickname">
    <h3 class="commands mb-5">
      {{ title }}
    </h3>  
    <b-form-input autocomplete="off" class="mt-3"
      v-for="n in numberOfPlayers" 
      :key="n"
      :placeholder="placeholders[n-1] + ' player'+'\'s nickname'"
      v-model="nickNames[n-1]"
    > 
    </b-form-input>
    <p
      v-if="!formIsValid"
      class="error-message"
    > Please fill all fields!
    </p>
    <b-button class="back-btn-back" variant="primary" 
      @click="backBtnClicked"
    ><b-icon icon="arrow-left-circle" shift-v="1"></b-icon> back
    </b-button>
    <b-button class="back-btn-next" variant="primary"
      @click="nextBtnClicked(nickNames)"
      :disabled="!formIsValid"
    >next <b-icon icon="arrow-right-circle" shift-v="1"></b-icon>
    </b-button>
  </div>
</template>


<script scoped>  
export default {
  props: {
    numberOfPlayers: {
      type: Number
    }
  }, 
  data() {
    return {
      title: 'Pick your nickname and prepare yourself!',
      placeholders: ['First', 'Second', 'Third', 'Fourth'],
      nickNames: ['','','',''] 
    }
  },
  methods: {
    backBtnClicked() {
      this.$emit('backStep')
    },
    nextBtnClicked(nickNames) {
      this.$emit('nextStep')
      this.$emit('nicknames',nickNames)
    }
  },
  computed: {
    formIsValid: function(){ 
        switch (4-(this.nickNames.length-this.numberOfPlayers)) {
          case 1: if (this.nickNames[0] != "")
            return true
              break
          case 2: if (this.nickNames[0] != "" && this.nickNames[1] != "")
            return true
              break
          case 3: if (this.nickNames[0] != "" && this.nickNames[1] != "" && this.nickNames[2] != "")
            return true
              break
          case 4: if (this.nickNames[0] != "" && this.nickNames[1] != "" && this.nickNames[2] != "" && this.nickNames[3] != "")
            return true
              break
          }
    return false 
    }
  }
}
</script>

<style scoped>

.form-control {
  border: 2px solid #ced4da;
  border-radius: 1.25rem;
}

.players-nickname {
  width: 100%;
}

.back-btn-back {
  float: left;
  margin-top: 20px;
}

.back-btn-next {
  float: right;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 3px;
}

</style>