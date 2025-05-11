<template>
  <div class="container">
    <top></top>

    <div class="content">
      <navbar></navbar>
      <router-view />
    </div>
    
    <bottom></bottom>
    <login></login>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  align-items: center;
}

.content {
  flex: 1; 
  padding-top: 100px;
  width: 100%;
  height: 1500px;
}
</style>