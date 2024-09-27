<script setup lang="ts">
import { BuildingLibraryIcon } from '@heroicons/vue/24/outline';
import type { Account } from '@/types';
import { formatAccountNumber, fromCents } from "@/utils/formatter";

interface Props {
  account: Account;
  selected: boolean;
}
defineProps<Props>();
defineEmits(['select']);
</script>

<template>
  <div class="pb-4 -mx-4 px-4 sm:pb-0 sm:mx-0 sm:px-0">
    <div
      :class="[
        'card text-white rounded-lg p-4 sm:p-6 min-w-[300px] sm:w-80 transition-all duration-300 cursor-pointer',
        selected
          ? 'bg-green-500 scale-100 shadow-xl shadow-green-400/50'
          : 'bg-gray-400 sm:scale-75 opacity-80'
      ]"
      @click="$emit('select', account)"
    >
      <div class="flex justify-between items-center">
        <h3 class="card-title text-lg font-bold">Splitly</h3>
        <p class="card-balance text-lg font-bold">C${{ fromCents(account.balance) }}</p>
      </div>
      <div class="flex justify-between items-center mt-4">
        <div class="flex items-center">
          <BuildingLibraryIcon class="w-4 h-4 text-gray-800 mr-1" />
          <p class="card-account-number text-sm">{{ formatAccountNumber(account.accountNumber) }}</p>
        </div>
        <p class="card-label text-sm">Balance</p>
      </div>
    </div>
  </div>
</template>
