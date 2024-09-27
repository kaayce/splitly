<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { fromCents } from '@/utils/formatter';
import { useTransactionsStore } from "@/stores";
import { useFriendsStore, useUserStore } from '@/stores';
import TransactionHeader from '@/components/TransactionHeader.vue';
import SplitBillList from '@/components/SplitBillList.vue';

const friendsStore = useFriendsStore();
const userStore = useUserStore();
const transactionStore = useTransactionsStore();
const route = useRoute();

const transactionId = route.params.id as string;

const currentUserId = computed(() => userStore.currentUser?.userId);
const transaction = computed(() => transactionStore.getTransactionById(transactionId));
const users = computed(() => {
  return [...friendsStore.selectedFriends, ...(userStore.currentUser ? [userStore.currentUser] : [])];
});
</script>

<template>
  <div class="p-2">
    <TransactionHeader>
      <div class="p-2" v-if="transaction">
        <h1 class="mb-6">Split Bill</h1>
        <div class="flex gap-2 items-center w-full">
          <h2 class="text-lg text-white font-bold">Amount to be shared:</h2>
          C${{ fromCents(transaction?.amount || 0) }}
        </div>
      </div>
    </TransactionHeader>

    <SplitBillList v-if="transaction && currentUserId" :users="users" :totalAmount="transaction.amount" :currentUserId="currentUserId" />
  </div>
</template>
