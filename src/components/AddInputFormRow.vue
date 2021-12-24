<template>
  <form @submit.prevent="submit" class="h-12">
    <input
      type="text"
      v-model="value"
      :placeholder="placeholder"
      class="
        h-full
        rounded-tl-lg rounded-bl-lg
        p-2
        text-black
        outline-none
        border
      "
    />
    <input
      type="submit"
      :value="buttonText"
      class="bg-secondary p-3 rounded-tr-lg rounded-br-lg text-white"
    />
  </form>
</template>
<script>
import { computed } from "vue";
export default {
  name: "AddInputFormRow",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "submit"],
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
      },
    });

    const submit = () => {
      emit("submit");
    };

    return {
      value,
      submit,
    };
  },
};
</script>
