<template>
  <form action="">
    <input type="text" v-model="value" :placeholder="placeholder" />
    <input type="submit" :value="buttonText" />
  </form>
</template>
<script>
import { computed } from "vue";
export default {
  name: "FormAddInputRow",
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
  emits: ["submit"],
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("submit", val);
      },
    });
    return {
      value,
    };
  },
};
</script>
