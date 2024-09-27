<script setup lang="ts">
import type { Transaction } from '@/types'
import { fromCents } from '@/utils/formatter';
import { useRouter } from "vue-router";

const props = defineProps<{
  transaction: Transaction;
}>()

const router = useRouter();

const goToTransactionDetail = () => {
  router.push({ name: 'transaction-detail', params: { id: props.transaction.transactionId } });
};

const imageMap = {
  dining: '🍽️',
  entertainment: '📺',
  groceries: '🛒',
  utilities: '🔌',
  other: '🤷'
} as const;
</script>

<template>
  <li class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-900 rounded-sm transition-colors duration-300" @click="goToTransactionDetail">
    <div class="flex items-center space-x-3">
      <div class="text-2xl">{{ imageMap[transaction.category as keyof typeof imageMap] || '🤷' }}</div>
      <div class="text-sm font-medium">{{ transaction.vendor }}</div>
    </div>
    <div class="text-sm font-semibold">{{ fromCents(transaction.amount) }}</div>
  </li>
</template>
