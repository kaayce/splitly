<script setup lang="ts">
import { ArrowUturnLeftIcon } from '@heroicons/vue/24/outline';
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.go(-1);
</script>

<template>
    <div class="flex flex-col gap-4 mb-4">
      <ArrowUturnLeftIcon class="size-8 text-white-800 mr-1 mb-4 cursor-pointer hover:text-green-300 transition-colors duration-300" @click="goBack" />
      <slot />
    </div>
  </template>
