
<template>
  <NuxtLayout>
    <v-app>
      <!-- <AuthWrapper > -->
        <v-container>

          <NavBar />
          <NuxtPage />
        </v-container>
      <!-- </AuthWrapper> -->
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import NavBar from './navbar.vue';
const router = useRouter()

const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
]

</script>