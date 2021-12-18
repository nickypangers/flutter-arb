<template>
  <div>
    <p>editableContent</p>
    <p>{{ editableContent }}</p>
    <p>languages</p>
    <p>{{ languages }}</p>
    <template v-if="isContentLoaded">
      <div>
        <button
          class="p-2 bg-green-600 text-white rounded-xl"
          @click="exportTranslations"
        >
          <font-awesome-icon icon="file-download" class="mr-2" /><span
            >Export</span
          >
        </button>
      </div>
      <div class="flex justify-between items-center">
        <form @submit.prevent="addLanguage">
          <input type="text" v-model="newLang" placeholder="New Language" />
          <input
            type="submit"
            value="Add Language"
            class="bg-blue-200 p-3 rounded-lg my-2"
          />
        </form>
        <form @submit.prevent="addTranslation">
          <input
            type="text"
            v-model="newTranslationKey"
            placeholder="New Translation"
          />
          <input
            type="submit"
            value="Add Translation"
            class="bg-blue-200 p-3 rounded-lg my-2"
          />
        </form>
      </div>
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
import { exportToFiles } from "../common/export";
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
    const languages = ref([]);
    const editableContent = ref({});
    const contentKeys = ref([]);
    const newLang = ref("");
    const newTranslationKey = ref("");
    const isContentLoaded = ref(false);

    const getEditableFileContents = async () => {
      let fileContents = {};
      for (const file of files.value) {
        const language = getLanguageFromName(file);
        languages.value.push(language);
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
      if (editableContent.value.length === 0) {
        languages.value = [];
      }
    };

    const deleteLanguage = (lang) => {
      editableContent.value.forEach((content) => {
        delete content[1][lang];
      });
      const languageIndex = languages.value.indexOf(lang);
      languages.value.splice(languageIndex, 1);
    };

    const addTranslation = () => {
      if (!newTranslationKey.value) {
        return;
      }
      let content = {};
      languages.value.forEach((lang) => {
        content[lang] = "";
      });
      editableContent.value.push([newTranslationKey.value, content]);
      newTranslationKey.value = "";
    };

    const addLanguage = () => {
      if (!newLang.value) {
        console.debug("addLanguage", "newLang empty");
        return;
      }

      if (editableContent.value.length === 0) {
        console.debug("addLanguage", "editableContent empty");
        return;
      }

      editableContent.value.forEach((content) => {
        if (content[1][newLang.value]) {
          console.debug("addLanguage", "newLang already exists");
          return;
        }
        content[1][newLang.value] = "";
      });

      if (languages.value.indexOf(newLang.value) === -1) {
        languages.value.push(newLang.value);
      }

      newLang.value = "";
    };

    const exportTranslations = () => {
      languages.value.forEach((lang) => {
        exportToFiles(editableContent.value, lang);
      });
    };

    onMounted(async () => {
      editableContent.value = await getEditableFileContents();
      isContentLoaded.value = true;
    });

    return {
      languages,
      getLanguageFromName,
      files,
      editableContent,
      isContentLoaded,
      contentKeys,
      addLanguage,
      addTranslation,
      deleteLanguage,
      deleteTranslation,
      newLang,
      newTranslationKey,
      exportTranslations,
    };
  },
};
</script>
