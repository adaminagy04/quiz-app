<template>
  <div class="container-number-of-players">
      <h3 class="commands mb-5">
        {{ title }}
      </h3>
        <div class="mt-3">
            <b-card class="mt-2 text-center"
              v-for="n in 4" 
              :key="n" 
              @click="playerNumClicked(n)"
            >  
              <b-card-text> 
                {{ n }} player
              </b-card-text>
            </b-card>
        </div>
  </div>
</template>

<script scoped>  
  export default {  
  data(){
    return {
      title: "Select the number of players!",
    }
  },
  methods: {
    playerNumClicked(n) {
      this.$emit('chooseNick', n);
    }
  } 
}
</script>

