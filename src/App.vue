<script setup>
import GroceryList from './components/GroceryList.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <header>
      <nav class="navbar navbar-light bg-white border-bottom shadow-sm mb-4" aria-label="Site">
        <div class="container">
          <span class="navbar-brand">Grocery Checklist</span>
        </div>
      </nav>
    </header>
    <main class="container flex-grow-1 pb-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <GroceryList />
        </div>
      </div>
    </main>
    <footer class="border-top py-3 text-muted">
      <div class="container">&copy; 2026 - Grocery Checklist - <a href="https://github.com/Arthure-code/grocery-checklist/blob/main/LICENSE">Licence</a></div>
    </footer>
  </div>
</template>
