<template>
  <div>
    <p>Edit</p>
    <div v-for="file in files">
      <p>Language: {{ getLanguageFromName(file) }}</p>
      <p>{{ getFileContent(file) }}</p>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { getLanguageFromName, getContentFromFile } from "../common/file.js";
export default {
  setup() {
    const store = useStore();
    const files = computed(() => Array.from(store.state.files));
    const getFileContent = (file) => {
      //   const content = await getContentFromFile(file);
      //   console.log(content);
      //   return content;
      return getContentFromFile(file)
        .then((content) => content)
        .catch((e) => console.log(e));
    };

    return {
      getLanguageFromName,
      files,
      getFileContent,
    };
  },
};
</script>
