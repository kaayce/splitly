<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';

import AccountHeader from '@/components/AccountHeader.vue';
import TransactionList from '@/components/TransactionList.vue';
import { useAccountStore, useTransactionsStore, useUserStore } from "@/stores";

const userStore = useUserStore();
const accountStore = useAccountStore();
const transactionStore = useTransactionsStore();

const isUserLoading = computed(() => userStore.isUserLoading);
const isTransactionLoading = computed(() => transactionStore.isTransactionLoading);
const currentUser = computed(() => userStore.currentUser);
const selectedAccount = computed(() => accountStore.selectedAccount);
const accounts = computed(() => accountStore.accounts);
const fetchAccounts = async () => await accountStore.fetchAccounts();

onMounted(async () => {
  await userStore.fetchUsers();
  await fetchAccounts();
  await transactionStore.fetchAccountTransactions();
});

watch(currentUser, async (newUser) => {
  if (newUser) {
    fetchAccounts();
  }
});

watch(selectedAccount, async (newAccount) => {
  if (newAccount) {
    await transactionStore.fetchAccountTransactions();
  }
});
</script>

<template>
  <div v-if="isUserLoading" class="text-center text-gray-500">
    Loading accounts...
  </div>

  <div v-else>
    <div v-if="currentUser && selectedAccount">
      <AccountHeader
        :user="currentUser"
        :accounts="accounts"
        :selectedAccount="selectedAccount"
        :setSelectedAccount="accountStore.setSelectedAccount"
      />
      <div class="divider divider-horizontal bg-gray-900 h-px"></div>
      <div v-if="isTransactionLoading" class="text-center text-gray-500">
        Loading transactions...
      </div>
      <TransactionList
        v-else
        :transactions="transactionStore.transactions"
      />
    </div>
    <div v-else>
      <p>No accounts available or user not loaded</p>
    </div>
  </div>
</template>
