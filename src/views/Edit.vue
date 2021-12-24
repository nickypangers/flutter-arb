<template>
  <div>
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center mb-4"
    >
      <button
        class="text-white p-2 bg-primary rounded-lg"
        @click="editAnotherProject"
      >
        Edit Another Project
      </button>
      <button
        class="mt-4 md:mt-0 text-white p-2 border border-white rounded-lg"
        @click="router.push('/guide')"
      >
        Guide
      </button>
    </div>
    <template v-if="!isContentLoaded">
      <p>Loading</p>
    </template>
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
      <div class="flex flex-col md:flex-row justify-between items-start my-5">
        <div class="mt-3 flex items-center">
          <add-input-form-row
            v-model="newTranslationKey"
            placeholder="New Translation"
            button-text="Add Translation"
            @submit="addTranslation"
          />
        </div>
        <div class="mt-3 flex items-center">
          <add-input-form-row
            v-model="newLang"
            placeholder="New Language"
            button-text="Add Language"
            @submit="addLanguage"
          />
          <button @click="router.push('/guide')">
            <font-awesome-icon
              icon="info-circle"
              size="lg"
              class="ml-2 text-white"
            />
          </button>
        </div>
      </div>
      <!-- <p>{{ editableContent }}</p> -->

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
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
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { exportToFiles } from "../common/export";
import AddInputFormRow from "../components/AddInputFormRow.vue";
import TranslationBox from "../components/TranslationBox.vue";
import {
  getLanguageFromName,
  getContentFromFile,
  contentObjectToEditable,
} from "../common/file";
export default {
  components: {
    TranslationBox,
    AddInputFormRow,
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
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
        toast.warning("Please enter a translation key");
        return;
      }

      let isTranslationKeyExists = false;

      editableContent.value.forEach((translation) => {
        if (translation[0] === newTranslationKey.value) {
          isTranslationKeyExists = true;
          return;
        }
      });

      if (isTranslationKeyExists) {
        toast.warning("Translation key already exists");
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
        // console.debug("addLanguage", "newLang empty");
        toast.warning("Language cannot be empty");
        return;
      }

      if (editableContent.value.length === 0) {
        // console.debug("addLanguage", "editableContent empty");
        toast.warning("No translations to add language to");
        return;
      }

      editableContent.value.forEach((content) => {
        if (content[1][newLang.value]) {
          // console.debug("addLanguage", "newLang already exists");
          toast.warning("Language already exists");
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
      if (languages.value.length === 0) {
        // console.debug("export", "languages empty");
        toast.warning("No translations to export");
        return;
      }

      if (editableContent.value.length === 0) {
        // console.debug("export", "editableContent empty");
        toast.warning("No translations to export");
        return;
      }

      const emptyKeyList = editableContent.value.filter(
        (translation) => translation[0] === ""
      );

      console.log(emptyKeyList);

      if (emptyKeyList.length > 0) {
        // console.debug("export", "empty key list");
        toast.warning("Translation key cannot be empty");
        return;
      }

      let isTranslationValueEmpty = false;

      editableContent.value.forEach((translation) => {
        languages.value.forEach((lang) => {
          if (!translation[1][lang]) {
            isTranslationValueEmpty = true;
            return;
          }
        });
      });

      if (isTranslationValueEmpty) {
        toast.warning("Translation cannot be empty");
        return;
      }

      languages.value.forEach((lang) => {
        exportToFiles(editableContent.value, lang);
      });
      toast.success("Successfully exported");
    };

    const editAnotherProject = () => {
      store.dispatch("clearFiles");
      if (store.state.files.length !== 0) {
        // console.debug("editAnotherProject", "files not empty");
        toast.warning("Something went wrong. Please refresh window");
        return;
      }
      router.push("/");
    };

    onMounted(async () => {
      editableContent.value = await getEditableFileContents();
      isContentLoaded.value = true;
    });

    return {
      router,
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
      editAnotherProject,
    };
  },
};
</script>
