<script setup lang="ts">
import { computed, defineEmits } from 'vue';
import { ClipboardDocumentListIcon, CameraIcon, PencilIcon, UsersIcon, ViewColumnsIcon } from '@heroicons/vue/24/outline';

interface Props {
  icon: 'menu' | 'users' | 'viewBoards' | 'pencil' | 'camera';
  text: string;
  subtext?: string;
  active?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['click']);

const iconComponents = {
  menu: ClipboardDocumentListIcon,
  users: UsersIcon,
  viewBoards: ViewColumnsIcon,
  pencil: PencilIcon,
  camera: CameraIcon
};

const icon = computed(() => iconComponents[props.icon]);

const handleClick = () => {
  if (props.active) {
    emit('click');
  }
};
</script>

<template>
  <div
    class="flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-300"
    :class="{
      'bg-gray-800 hover:bg-gray-700': active,
      'bg-gray-500 cursor-not-allowed': !active
    }"
    @click="handleClick"
  >
    <component :is="icon" class="w-6 h-6 mr-5" />
    <div>
      <div class="font-semibold">{{ text }}</div>
      <div v-if="subtext" class="text-sm text-gray-400">{{ subtext }}</div>
    </div>
  </div>
</template>
