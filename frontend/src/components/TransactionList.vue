<script setup lang="ts">
import { computed } from 'vue';

import TransactionListRow from '@/components/TransactionListRow.vue';
import { fromCents } from '@/utils/formatter';
import { isSameDay } from '@/utils/dateUtils';
import type { Transaction } from '@/types';

const props = defineProps<{
  transactions: Transaction[]
}>()

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

const groupedTransactions = computed(() => {
  // Initialize an empty array for the grouped transactions
  const groups: { date: string; total: number; transactions: Transaction[] }[] = [];

  // Iterate over each transaction
  for (const transaction of props.transactions) {
    const transactionDate = new Date(transaction.transactionDate).toDateString();

    // Check if the date is already in the groups
    const existingGroup = groups.find(group => isSameDay(group.date, transactionDate));

    if (existingGroup) {
      // If the group exists, add the transaction to that group
      existingGroup.transactions.push(transaction);
      existingGroup.total += transaction.amount;
    } else {
      // If the group does not exist, create a new one
      groups.push({
        date: transactionDate,
        total: transaction.amount,
        transactions: [transaction],
      });
    }
  }

  // Sort the groups by date
  return groups.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
})

</script>

<template>
  <div class="flex flex-col mt-4 gap-4 px-4">
    <h1>Activity</h1>
    <div v-for="group in groupedTransactions" :key="group.date" class="border border-gray-900 rounded-md p-2">
      <div class="flex justify-between items-center p-2">
        <span class="text-xs font-bold">{{ formatDate(group.date) }}</span>
        <span class="text-xs font-bold">{{ fromCents(group.total) }}</span>
      </div>
      <ul class="divide-y divide-gray-700">
        <TransactionListRow
          v-for="transaction in group.transactions"
          :key="transaction.transactionId"
          :transaction="transaction"
        />
      </ul>
    </div>
  </div>
</template>
