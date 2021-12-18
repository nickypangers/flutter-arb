<template>
  <div
    ref="dropArea"
    class="
      h-96
      w-96
      border-2 border-dashed border-secondary
      flex
      items-center
      justify-center
    "
  >
    <span>
      {{ dropText }}
    </span>
    <input
      ref="fileInput"
      type="file"
      name="files"
      id="files"
      accept=".arb"
      multiple
      hidden
    />
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "FileDropArea",
  setup() {
    const store = useStore();
    const dropArea = ref(null);
    const isDragOver = ref(false);
    const dropText = computed(() =>
      isDragOver.value ? "Drop it!" : "Drag and drop .arb files here"
    );

    onMounted(() => {
      console.log(dropArea.value);
    });

    const dragLeaveHandler = (e) => {
      e.preventDefault();
      isDragOver.value = false;
    };

    const dragOverHandler = (e) => {
      e.preventDefault();
      isDragOver.value = true;
    };

    const dragEnterHandler = (e) => {
      e.preventDefault();
      isDragOver.value = true;
    };

    const dropHandler = (e) => {
      e.preventDefault();
      isDragOver.value = false;
      const files = e.dataTransfer.files;
      console.log(files);
      if (files.length === 0) {
        return;
      }
      store.dispatch("loadFiles", files);
    };

    onMounted(() => {
      dropArea.value.addEventListener("drop", dropHandler);
      dropArea.value.addEventListener("dragenter", dragEnterHandler);
      dropArea.value.addEventListener("dragover", dragOverHandler);
      dropArea.value.addEventListener("dragleave", dragLeaveHandler);
    });

    return {
      dropArea,
      dropText,
    };
  },
};
</script>
