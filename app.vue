
<template>
  <div class="bg-gray-50 dark:bg-gray-900 h-screen w-screen">
    <Navbar v-if="loggedIn" />
    <div>
      <button v-if="loggedIn" @click="handleSignOut">Sign Out</button>
      <button v-else @click="handleSignIn">Sign In</button>
    </div>
    <NuxtPage class="max-w-screen-xl mx-auto p-4" />
  </div>
</template>

<script setup lang="ts">
  const { status, signIn, signOut } = useAuth()
  const loggedIn = computed(() => status.value === 'authenticated')

async function handleSignIn(){
  await signIn('google')
}

async function handleSignOut(){
  await signOut()
}
</script>
