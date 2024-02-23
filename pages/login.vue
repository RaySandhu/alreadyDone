<script setup lang="ts">
    const { signIn } = useAuth()

  definePageMeta({
    layout: false,
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/dashboard',
    },
})
</script>

<template>
    <div class="div">
        <img class="already-done-logo" alt="Already done logo" src="/img/logo.png" />
        <div class="text-wrapper font-museoModerno">Already Done</div>
        <button class="text-wrapper-2 rectangle" @click="signIn('google')">Sign In With Google</button>
    </div>
  </template>

<style>
.div {
    background: linear-gradient(180deg, rgb(14.08, 77.45, 79.69) 0%, rgb(128, 213, 216) 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.already-done-logo {
  height: min(20vh, 20vw);
  object-fit:scale-down;
  margin-top: 5%;
  margin-bottom: 5%;
}

.text-wrapper {
  color: #000000;
  font-size: min(10vh, 10vw);
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
}

.rectangle {
  background-color: #fff;
  border-radius: 30px;
  padding: 20px;
  margin-top: 10vh;
  margin-bottom: 10%;
}

.text-wrapper-2 {
  color: #000000;
  font-size: min(3vh, 5vw);
  font-weight: 400;
  letter-spacing: 0;
  text-align: center;
  white-space: nowrap;
}
</style>