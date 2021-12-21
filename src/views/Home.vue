<template>
  <div>
    <div class="py-8">
      <h1>Flutter ARB Editor</h1>
    </div>
    <div
      class="text-3xl font-extrabold flex flex-col justify-center items-center"
    >
      <file-drop-area />
    </div>
    <div class="mt-12">
      <button
        class="p-3 bg-secondary text-white text-lg rounded-lg"
        @click="router.push('/edit')"
      >
        Start New Project
      </button>
    </div>
  </div>
</template>
<script>
import FileDropArea from "../components/FileDropArea.vue";
import { useStore } from "vuex";
import { computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    FileDropArea,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const files = computed(() => Array.from(store.state.files));

    watch(
      () => store.state.files,
      (newVal) => {
        if (newVal.length === 0) {
          return;
        }
        router.push("/edit");
      }
    );

    onMounted(() => {});

    return {
      files,
      router,
    };
  },
};
</script>
