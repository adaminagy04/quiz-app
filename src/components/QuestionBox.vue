<template>
  <div>
      <h3 class="mb-1">
        {{ currentQuestion.question }}
      </h3>
      <hr class="my-4">
      <div class="mt-3 mb-4">
        <b-card class="mt-2 text-center"
          v-for="(answer, index) in shuffledAnswers" 
          :key="index"
          @click.prevent="submitClicked ? '' : selectedAnswer(index)"
          :class="answerClass(index)"
        >  
          <b-card-text>
            {{ answer }}
          </b-card-text>
        </b-card>
      </div>
      <b-button 
        variant="success"
        @click="submitAnswer"
        :disabled="!(selectedIndex !== null) || answered == true"
      >
      <b-icon icon="check2" shift-v="-1"></b-icon> submit
      </b-button>
      <b-button 
        variant="primary ml-2"
        @click="btnTitleChanged ? getBtnTitle(btnTitle) : nextQuestion()"
        :disabled="!submitClicked"
      > {{ btnTitle }} 
      <b-icon icon="arrow-right-circle" shift-v="1"></b-icon>
      </b-button>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    currentQuestion: {
      type: Object
    },
    questionsOfNumber: {
      type: Number
    },
    index: {
      type: Number
    },
    numberOfPlayers: {
      type: Number
    },
    round: {
      type: Number
    },
    increment: {
      type: Function
    }
  },
  data() {
    return {
      selectedIndex: null,
      shuffledAnswers: [],
      submitClicked: false,
      answered: false,
      btnTitle: 'next',
      btnTitleChanged: false
    }
  },
  methods: {
    nextQuestion: function() {
      this.$emit('incIndex')
    },
    submitAnswer: function() {
      let isCorrect = false
      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true
      }
        this.answered = true
        this.submitClicked = true
        this.increment(isCorrect)
    },
    selectedAnswer(index) {
      this.selectedIndex = index
      this.answered = false
    },
    shuffleAnswers() {
      let allAnswers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
      this.shuffledAnswers = _.shuffle(allAnswers)
      this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
    },
    answerClass(index) {
      let answerClass = ''
      if (!this.answered && this.selectedIndex === index) {
          answerClass = 'selected-answer'
      } else if (this.answered && this.correctIndex === index) {
          answerClass = 'correct-answer'
      } else if (this.answered && this.selectedIndex === index && this.correctIndex !== index) {
          answerClass = 'incorrect-answer'
      } else if (this.answered) {
          answerClass = 'disabled-answer'
      } 
        return answerClass
    },
    btnTitleChange() {
      if (this.index === (this.questionsOfNumber-1) && (this.numberOfPlayers == this.round)){
          this.btnTitle = 'end game'
          this.btnTitleChanged = true
      } else if (this.index === (this.questionsOfNumber-1) && (this.numberOfPlayers != this.round)) {
          this.btnTitle = 'next player'
          this.btnTitleChanged = true
      } else {
          this.btnTitle = 'next'
          this.btnTitleChanged = false
      }
    },
    getBtnTitle: function(btnTitle) {
      if (btnTitle == 'end game') {
        this.$alert("Game is over! Let's start again!")
        this.$emit('backToStepZero')
      } else if(btnTitle == 'next player') {
          this.$confirm("Next player's turn!").then(() => {
          this.$emit('backToStepThree')
          })  
      }
    }
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null 
        this.shuffleAnswers()
        this.answered = false
        this.submitClicked = false
        this.isCorrect = false
        this.btnTitleChange()
      }
    }
  },
  computed: {
    answers() {
      let allAnswers = [...this.currentQuestion.incorrect_answers]
      allAnswers.push(this.currentQuestion.correct_answer)
      return allAnswers
    }
  }
}
</script>

<style lang="scss" scoped >

  .selected-answer {
    background: lightskyblue !important;
    &:hover {
      background: lightskyblue !important;
    }
  }

  .correct-answer {
    background: lightgreen;
    &:hover {
      background: lightgreen;
    }
  }

  .incorrect-answer {
    background: tomato;
    &:hover {
      background: tomato;
    }
  }

</style>