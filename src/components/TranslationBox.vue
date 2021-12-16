<template>
  <div class="border p-4 rounded">
    <h1>{{ title }}</h1>
    <div
      class="border p-4 border-gray-300 flex"
      v-for="(content, lang, index) in contents"
    >
      <p class="mr-3">{{ lang }}</p>
      <!-- <p>{{ contents[lang] }}</p> -->
      <input type="text" v-model="contents[lang]" />
      <button @click="deleteLanguage(lang)">Remove Language</button>
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
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:modelValue", "ondelete"],
  setup(props, { emit }) {
    const contents = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
      },
    });

    const deleteLanguage = (lang) => {
      emit("ondelete", lang);
    };

    return {
      contents,
      deleteLanguage,
    };
  },
};
</script>
