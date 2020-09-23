<template>
  <div id="app">
    <Header 
    :numCorrect="numCorrect"
    :numTotal="numTotal"
    :timeLeft="timeLeft"
    />
    <b-jumbotron>
      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="12">
             <component
              v-bind="currentComponent.bind"
              v-on="currentComponent.on"
              v-bind:is="currentComponent.bind.is"
             />
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import NumberOfPlayers from "@/components/NumberOfPlayers.vue";
import ChooseNick from "@/components/ChooseNick.vue";
import ChooseCategory from "@/components/ChooseCategory.vue";
import QuestionBox from "@/components/QuestionBox.vue";

const TIME = 60

export default {
  name: "app",
  components: {
    Header,
    NumberOfPlayers,
    ChooseNick,
    ChooseCategory,
    QuestionBox
  },
 
  data() {
     return {
       step: 0,
       numberOfPlayers: 0,
       categoryNum: 0,
       categoryArray: ['Sports', 'Geography', 'History', 'Animals'],
       categoryName: '',
       url: '',
       questions: [],
       index: 0,
       questionsOfNumber: 5,
       round: 1,
       numCorrect: 0,
       numTotal: 0,
       time: TIME,
       timer: null
     }
  },
  computed: {
    currentComponent(){
      switch(this.step) {
        case 0: 
        return {
          bind: {
            is: NumberOfPlayers
          },
          on: {
            chooseNick: this.chooseNick
          }
        }
        case 1: 
        return  {
          bind: {
            is: ChooseNick,
            numberOfPlayers: this.numberOfPlayers
          },
          on: {
            backStep: this.backStep,
            nextStep: this.nextStep
          }
        }
        case 2: 
        return  {
          bind: {
            is: ChooseCategory,
            categoryNum: this.categoryNum
          },
          on: {
            backStep: this.backStep,
            fetchCategory: this.fetchCategory
          }
        }
        case 3: 
        return  {
          bind: {
            is: QuestionBox,
            currentQuestion: this.questions[this.index],
            index: this.index,
            questionsOfNumber: this.questionsOfNumber,
            numberOfPlayers: this.numberOfPlayers,
            increment: this.increment,
            round: this.round
          },
          on: {
            incIndex: this.incIndex,
            backToStepZero: this.backToStepZero,
            backToStepThree: this.backToStepThree
          }
        }
      }
      return {}
    },
    timeLeft () {
      return `${this.minutes}:${this.seconds}`
      },
      minutes () {
    	  return String(Math.floor(this.time / 60)).padStart(2, '0')
      },
      seconds () {
    	  return String(this.time % 60).padStart(2, '0')
      }
  },
  methods: {
      chooseNick: function(numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
        this.step = 1;
      },
      backStep: function() {
        this.step -= 1;
      },
      nextStep: function() {
        this.step += 1;
      },
      incIndex: function() {
        if (this.index < (this.questionsOfNumber-1))
        this.index++
      },
      fetchCategory: function(categoryNum) {
        this.categoryNum = categoryNum;
        this.categoryName = this.categoryArray[categoryNum];
        this.$confirm('The selected category is ' + this.categoryName + '. Only one minute for five questions. Everybody gets the same questions, so try to hide your answers. Do you want to start?').then(() => {
          this.step = 3
          this.startTimer()
        })

        switch (categoryNum) {
          case 0:
            this.url = 'https://opentdb.com/api.php?amount=5&category=21';
          break;
          
          case 1:
            this.url = 'https://opentdb.com/api.php?amount=5&category=22';
          break;

          case 2:
            this.url = 'https://opentdb.com/api.php?amount=5&category=23';
          break;

          case 3:
            this.url = 'https://opentdb.com/api.php?amount=5&category=27';
          break;
        }
        
        fetch(this.url, {
            method: 'GET',
        })

        .then(response => {
          return (response.json())
        })
        
        .then(data => {
            //console.log('Success: ', data)
            this.questions = data.results
        })

        .catch((error) => {
            console.log('Error: ', error)
        })
      },
      backToStepThree: function() {
        this.index = 0,
        this.numCorrect = 0,
        this.numTotal = 0,
        this.time = TIME,
        this.round++,
        this.startTimer()
      },
      backToStepZero: function() {
        this.index = 0,
        this.step = 0,
        this.numCorrect = 0,
        this.numTotal = 0,
        this.time = TIME,
        this.round = 1,
        this.nickNames = []
      },
      increment(isCorrect) {
        if (isCorrect) {
          this.numCorrect++
        }
        this.numTotal++
      },
      countDownTimer () {
    	if (this.time > 0 && this.numTotal != 5) {
      	this.time--
        return this.time
      }
      
      clearInterval(this.timer)

      if (this.numberOfPlayers != 1 && this.numberOfPlayers != this.round && this.time == 0) {
          this.$confirm("Time is up!\nNext player's turn!").then(() => {
          this.backToStepThree()
        })
      } else if(this.numberOfPlayers != 1 && this.numberOfPlayers == this.round && this.time == 0){
          this.$confirm("Time is up!\nGame is over! Let's play again!").then(() => {
          this.backToStepZero()
        })
      } else if(this.numberOfPlayers == 1 && this.time == 0) {
          this.$confirm("Time is up! Game is over! Let's play again!").then (() => {
          this.backToStepZero()
        })
        }
      },

      startTimer() {
        this.timer = setInterval(this.countDownTimer, 1000)
      }
  }
}
</script>

<style lang="scss">
#app {
  font-family: cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #6c757d;
  background-image: url("assets/bg.jpg");
  min-height: 100vh;
}

.jumbotron {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 540px;
  width: 75%;
  margin: 0px auto;
  background-color: #fdfdfeb0;
}

.card {
  border-radius: 1.25rem;
  border: 2px solid rgba(0, 0, 0, 0.125);
    &:hover {
      background: #EEE;
      border-radius: 1.25rem;
      cursor: pointer;
    }
    &.disabled-answer:hover {
      cursor: default;
      background: #fff
    }
    &.correct-answer {
      cursor: default;
    }
    &.incorrect-answer {
      cursor: default;
    }
}

.swal2-popup {
  font-family: cursive;
}

.swal2-styled {
  &.swal2-confirm {
  background-color: #007bff;
  font-size: 0.9em;
  }
  &.swal2-cancel {
  font-size: 0.9em;
  }
}
  
</style>
