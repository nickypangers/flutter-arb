<template>
  <div class="container py-8">
    <div class="flex justify-end items-center mb-6">
      <a href="https://github.com/nickypangers/flutter-arb">
        <font-awesome-icon :icon="['fab', 'github']" size="2x" />
      </a>
    </div>
    <router-view />
    <div class="py-8">
      <p>Created by <a href="https://nickypangers.com">@nickypangers</a></p>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    return {};
  },
};
</script>
