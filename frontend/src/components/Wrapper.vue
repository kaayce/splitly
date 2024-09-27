<script setup lang="ts">
import UserSelector from './UserSelector.vue'
</script>
<template>
   <main class="h-screen flex flex-col container gap-1 p-5 md:p-8 lg:p-12">
        <slot />
        <UserSelector />
    </main>
</template>
