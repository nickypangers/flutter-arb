<template>
  <div class="border p-4 rounded-xl">
    <div class="w-full flex justify-between items-center pb-2">
      <input
        type="text"
        class="text-3xl font-bold flex-grow text-primary"
        v-model="translationTitle"
      />
      <button class="p-1" @click="deleteTranslation">
        <font-awesome-icon icon="times" />
      </button>
    </div>
    <div>
      <div
        class="mt-2 flex items-center"
        v-for="(content, lang, index) in contents"
      >
        <p class="mr-3">{{ lang }}</p>
        <input
          type="textarea"
          class="flex-grow border rounded-lg p-2 mr-3 text-black"
          v-model="contents[lang]"
        />
        <button class="p-1" @click="deleteLanguage(lang)">
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
export default {
  name: "TranslationBox",
  props: {
    title: {
      type: String,
      default: "",
    },
    contents: {
      type: Object,
      default: () => {},
    },
  },
  emits: [
    "update:title",
    "update:contents",
    "ondeletelanguage",
    "ondeletetranslation",
  ],
  setup(props, { emit }) {
    const translationTitle = computed({
      get() {
        return props.title;
      },
      set(val) {
        emit("update:title", val);
      },
    });

    const contents = computed({
      get() {
        return props.contents;
      },
      set(val) {
        emit("update:contents", val);
      },
    });

    const deleteLanguage = (lang) => {
      emit("ondeletelanguage", lang);
    };

    const deleteTranslation = () => {
      emit("ondeletetranslation");
    };

    return {
      translationTitle,
      contents,
      deleteLanguage,
      deleteTranslation,
    };
  },
};
</script>
<style scoped>
input {
  @apply bg-transparent;
}
</style>
