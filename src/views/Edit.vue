<template>
  <div>
    <p>editableContent</p>
    <p>{{ editableContent }}</p>
    <template v-if="isContentLoaded">
      <form @submit.prevent="addLanguage">
        <input type="text" v-model="newLang" placeholder="New Language" />
        <input
          type="submit"
          value="Add Language"
          class="bg-blue-200 p-3 rounded-lg my-2"
        />
      </form>
      <div class="grid grid-cols-2 gap-3">
        <translation-box
          v-for="(translation, index) in editableContent"
          v-model:title="translation[0]"
          v-model:contents="translation[1]"
          @ondeletelanguage="deleteLanguage"
          @ondeletetranslation="deleteTranslation(index)"
        />
      </div>
    </template>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import TranslationBox from "../components/TranslationBox.vue";
import {
  getLanguageFromName,
  getContentFromFile,
  contentObjectToEditable,
} from "../common/file";
export default {
  components: {
    TranslationBox,
  },
  setup() {
    const store = useStore();
    const files = computed(() => Array.from(store.state.files));
    const editableContent = ref({});
    const contentKeys = ref([]);
    const newLang = ref("");

    const isContentLoaded = ref(false);
    const getEditableFileContents = async () => {
      let fileContents = {};
      for (const file of files.value) {
        const language = getLanguageFromName(file);
        const content = await getContentFromFile(file);
        const keys = Object.keys(content);
        if (keys.length > contentKeys.value.length) {
          contentKeys.value = keys;
        }
        fileContents[language] = content;
      }
      let editableObject = contentObjectToEditable(
        fileContents,
        contentKeys.value
      );
      return Object.entries(editableObject);
    };

    const deleteTranslation = (index) => {
      editableContent.value.splice(index, 1);
    };

    const deleteLanguage = (lang) => {
      editableContent.value.forEach((content) => {
        delete content[1][lang];
      });
    };

    const addLanguage = () => {
      if (!newLang.value) {
        console.debug("addLanguage", "newLang empty");
        return;
      }

      editableContent.value.forEach((content) => {
        if (content[1][newLang.value]) {
          console.debug("addLanguage", "newLang already exists");
          return;
        }
        content[1][newLang.value] = "";
      });

      newLang.value = "";
    };

    onMounted(async () => {
      editableContent.value = await getEditableFileContents();
      isContentLoaded.value = true;
    });

    return {
      getLanguageFromName,
      files,
      editableContent,
      isContentLoaded,
      contentKeys,
      addLanguage,
      deleteLanguage,
      deleteTranslation,
      newLang,
    };
  },
};
</script>
