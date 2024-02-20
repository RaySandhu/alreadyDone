<template>
    <div>
        <h2 style="background-color: blue;">
            Index Content
        </h2>
        <v-btn @click="printData()">
            Example API call
        </v-btn>
    </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/example')

const printData = () => {
    console.log(data.value)
}

</script>