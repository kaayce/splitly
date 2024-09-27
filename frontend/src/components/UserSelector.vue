<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/stores/users';
import type { User } from '@/types';

const userStore = useUserStore();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectUser = (user: User) => {
  userStore.setCurrentUser(user);
  isDropdownOpen.value = false;
};

const currentUser = computed(() => userStore.currentUser);
const isUserLoading = computed(() => userStore.isUserLoading);

const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.getElementById('dropdown');
  const button = document.getElementById('dropdownDefaultButton');

  if (dropdown && !dropdown.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="relative flex flex-row justify-end items-center mt-32">
    Select a User:

    <button
      id="dropdownDefaultButton"
      @click="toggleDropdown"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-3 transition-colors duration-300"
      type="button"
    >
      {{ currentUser?.fullName || 'Select a user ↓' }}
    </button>

    <div v-if="isUserLoading" class="ml-4 text-gray-500">
      Loading users...
    </div>

    <!-- Dropdown -->
    <div
      id="dropdown"
      v-if="isDropdownOpen && !isUserLoading"
      class="absolute right-0 bottom-full mb-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li v-for="user in userStore.users" :key="user.userId">
          <div
            @click.prevent="selectUser(user)"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-300"
          >
            {{ user.fullName }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
