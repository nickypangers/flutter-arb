<template>
  <div class="border p-4 rounded">
    <div class="flex items-end">
      <div class="mr-1">Edit</div>
      <input
        type="text"
        class="text-3xl font-bold"
        v-model="translationTitle"
      />
    </div>
    <div>
      <div
        class="border p-4 border-gray-300 flex items-center"
        v-for="(content, lang, index) in contents"
      >
        <p class="mr-3">{{ lang }}</p>
        <!-- <p>{{ contents[lang] }}</p> -->
        <input
          type="text"
          class="flex-grow border rounded-lg p-2 mr-3"
          v-model="contents[lang]"
        />
        <button class="rounded-lg bg-red-200 p-1" @click="deleteLanguage(lang)">
          Remove
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
  emits: ["update:title", "update:contents", "ondelete"],
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
      emit("ondelete", lang);
    };

    return {
      translationTitle,
      contents,
      deleteLanguage,
    };
  },
};
</script>
