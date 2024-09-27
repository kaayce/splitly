<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

import { fromCents } from '@/utils/formatter';
import { useTransactionsStore } from "@/stores";
import { useFriendsStore } from '@/stores/friends';
import TransactionHeader from '@/components/TransactionHeader.vue';
import SelectFriendsList from '@/components/SelectFriendsList.vue';

const route = useRoute();
const transactionStore = useTransactionsStore();
const friendsStore = useFriendsStore();

const transactionId = route.params.id as string;

onMounted(async () => {
  await friendsStore.fetchFriends();
  // friendsStore.selectedFriendIds.clear();
});

const transaction = computed(() => transactionStore.getTransactionById(transactionId));
const friends = computed(() => friendsStore.friends);
const selectedIds = computed(() => friendsStore.selectedFriendIds);
const isFriendSelected = (friendId: string) => friendsStore.selectedFriendIds.has(friendId);
const toggleSelection = (friendId: string) => {
  friendsStore.toggleFriendSelection(friendId);
};
</script>


<template>
  <div class="p-2">
    <TransactionHeader>
      <div class="p-2" v-if="friends && transaction && selectedIds">
        <h1 class="mb-6">Select Friends</h1>
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

    <SelectFriendsList
      v-if="friends"
      :friends="friends"
      :toggleSelection="toggleSelection"
      :isFriendSelected="isFriendSelected"
    />
  </div>
</template>
