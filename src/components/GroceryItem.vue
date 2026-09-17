<script setup>
import { useGroceryStore } from '../stores/grocery.js'

// One line of the list: a checkbox that marks the item as bought. The item
// comes in as a prop; the change goes to the store.
defineProps({
  item: { type: Object, required: true },
})

const store = useGroceryStore()
</script>

<template>
  <li class="list-group-item" data-testid="item">
    <div class="form-check">
      <input
        :id="`item-${item.id}`"
        type="checkbox"
        class="form-check-input"
        :checked="item.bought"
        data-testid="bought"
        @change="store.toggleItem(item.id)"
      >
      <label :for="`item-${item.id}`" class="form-check-label" data-testid="name">{{ item.name }}</label>
    </div>
  </li>
</template>
