<script setup>
import { useGroceryStore } from '../stores/grocery.js'
import AddItemForm from './AddItemForm.vue'
import GroceryItem from './GroceryItem.vue'

// The list page: the form on top, one GroceryItem per item, the count of
// what is bought, and a button that empties everything.
const store = useGroceryStore()
</script>

<template>
  <section>
    <h1 class="display-5 mb-3">My grocery list</h1>
    <AddItemForm />
    <ul v-if="store.totalCount > 0" class="list-group mb-2" data-testid="list">
      <GroceryItem v-for="item in store.items" :key="item.id" :item="item" />
    </ul>
    <p class="d-flex align-items-center gap-3 mb-0">
      <span data-testid="count">Items bought: {{ store.boughtCount }} / {{ store.totalCount }}</span>
      <button type="button" class="btn btn-outline-secondary btn-sm" :disabled="store.totalCount === 0" data-testid="clear" @click="store.clear()">Clear the list</button>
    </p>
  </section>
</template>
