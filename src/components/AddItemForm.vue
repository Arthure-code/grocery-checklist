<script setup>
import { computed, ref } from 'vue'
import { useGroceryStore } from '../stores/grocery.js'

// One field, one button. The button stays disabled until something is
// typed; submitting hands the name to the store and empties the field.
const store = useGroceryStore()
const name = ref('')
const canAdd = computed(() => name.value.trim() !== '')

function submit() {
  store.addItem(name.value)
  name.value = ''
}
</script>

<template>
  <form class="row g-2 align-items-center mb-3" @submit.prevent="submit">
    <label for="item-name" class="col-auto col-form-label">Item to buy:</label>
    <div class="col">
      <input id="item-name" v-model="name" type="text" class="form-control" autocomplete="off" data-testid="item-name">
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary" :disabled="!canAdd" data-testid="add">Add</button>
    </div>
  </form>
</template>
