<template>
  <div class="container-choose-category">
      <h3 class="commands mb-5">
        {{ title }}
      </h3>
        <div class="mt-3">
            <b-card class="mt-2 text-center"
              v-for="(category, index) in categories" 
              :key="category"
              @click="categoryClicked(index)" 
            >  
              <b-card-text>
                {{ category }}
              </b-card-text>
            </b-card>
        </div>
      <b-button class="back-btn-back" variant="primary" 
        @click="backBtnClicked"
      ><b-icon icon="arrow-left-circle" shift-v="1"></b-icon> back
      </b-button>
  </div>
</template>

<script scoped>  
export default { 
  data() {
    return {
      title: 'Select Category!',
      categories: ['Sports', 'Geography', 'History', 'Animals']
    }
  },
  methods: {
    backBtnClicked() {
      this.$emit('backStep')
    },
    categoryClicked(categoryNum) {
      this.$emit('fetchCategory', categoryNum)
    }
  } 
}
</script>

<style scoped>

.back-btn-back {
  float: left;
  margin-top: 20px;
}

.text-center {
  cursor: pointer;
}

</style>
