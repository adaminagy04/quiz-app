<template>
  <div>
    <b-nav tabs class="mb-5">
      <b-nav-item disabled>
        <b>QuizApp</b>
      </b-nav-item>
      <b-nav-item disabled>
        <b-icon icon="table" scale="1.2"></b-icon>
          <span class="ml-2">
            {{numCorrect}}/{{numTotal}}
          </span>
      </b-nav-item>
      <b-nav-item disabled>
        <b-icon icon="person-fill" scale="1.5"></b-icon>
          <span class="ml-2">
            Adam <!-- Ide szeretném majd dinamikusan megjeleníteni a playerek neveit-->
          </span>
      </b-nav-item>
      <b-nav-item disabled>
        <b-icon icon="clock" scale="1.2"></b-icon>
          <span class="ml-2">
            {{timeLeft}}
          </span>
      </b-nav-item>
    </b-nav>
  </div>
</template>


<script>
  export default {
    props: {
      numCorrect: {
        type: Number
      },
      numTotal: {
        type: Number
      },
      timeLeft: {
        type: String
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped>
  
  .nav-tabs {
    background: #fff;
  }

</style>