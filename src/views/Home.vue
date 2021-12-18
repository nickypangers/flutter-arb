<template>
  <div>
    <div class="py-16">
      <h1>Flutter ARB Editor</h1>
    </div>
    <div
      class="text-3xl font-extrabold flex flex-col justify-center items-center"
    >
      <file-drop-area />
    </div>
  </div>
</template>
<script>
import FileDropArea from "../components/FileDropArea.vue";
import { useStore } from "vuex";
import { computed, watch } from "vue";
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
    return {
      files,
    };
  },
};
</script>
