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
  <div
    :class="[
      'card text-white rounded-lg p-6 w-80 h-35 transition-transform duration-300 cursor-pointer',
      selected ? 'bg-green-500 scale-100 shadow-lg' : 'bg-gray-400 scale-75 opacity-80'
    ]"
    @click="$emit('select', account)"
  >
    <div class="flex justify-between items-center">
      <h3 class="card-title text-lg font-bold">Splitly</h3>
      <p class="card-balance text-lg font-bold">C${{ fromCents(account.balance) }}</p>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div class="flex items-center">
        <BuildingLibraryIcon class="size-4 text-gray-800 mr-1" />
        <p class="card-account-number text-sm">{{ formatAccountNumber(account.accountNumber) }}</p>
      </div>
      <p class="card-label text-sm">Balance</p>
    </div>
  </div>
</template>
