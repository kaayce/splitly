<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { fromCents } from '@/utils/formatter';
import { useTransactionsStore } from '@/stores';
import TransactionHeader from '@/components/TransactionHeader.vue';
import TransactionActionItem from '@/components/TransactionActionItem.vue';

const transactionStore = useTransactionsStore();
const router = useRouter();
const route = useRoute();

const transactionId = route.params.id as string;

const transaction = computed(() => transactionStore.getTransactionById(transactionId));

const actionItems = [
  { icon: 'menu', text: 'Dining out', subtext: 'Change Category', active: false },
  { icon: 'users', text: 'Split this bill', subtext: 'Instantly get paid back by your friends', active: true },
  { icon: 'viewBoards', text: 'Add to shared tab', subtext: 'A simple way to manage shared experiences', active: false },
  { icon: 'pencil', text: 'Add notes', subtext: 'Describe this payment', active: false },
  { icon: 'camera', text: 'Add receipt', subtext: '', active: false },
] as const;

const handleActionClick = (item: typeof actionItems[number]) => {
  if (item.icon === 'users') {
    router.push({ name: 'select-friends', params: { id: transactionId } });
  }
};
</script>

<template>
  <TransactionHeader>
    <div class="p-2" v-if="transaction">
      <div class="flex justify-between w-full">
        <div class="text-sm text-gray-400 font-bold">
          <h2 class="text-xl text-white font-bold">{{ transaction.vendor }}</h2>
          <span class="text-xs text-gray-400 font-bold">{{ transaction.category }}</span>
        </div>
        <div>
          C${{ fromCents(transaction?.amount || 0) }}
        </div>
      </div>
    </div>
  </TransactionHeader>

  <div class="mt-6 space-y-2" v-if="transaction">
    <TransactionActionItem
      v-for="item in actionItems"
      :key="item.icon"
      :icon="item.icon"
      :text="item.text"
      :subtext="item.subtext"
      :active="item.active"
      @click="handleActionClick(item)"
    />
  </div>

  <div v-else>No transactions</div>
</template>
