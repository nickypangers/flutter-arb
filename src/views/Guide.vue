<template>
  <div class="text-white text-left">
    <div class="mb-4">
      <button
        class="text-white p-2 border border-white rounded-lg"
        @click="router.go(-1)"
      >
        Back
      </button>
    </div>
    <h1 class="underline">Guide</h1>
    <br />
    <section id="language">
      <h2>Language</h2>
      <p>
        Flutter localization uses ISO 639-1 (2 letter) for locale codes. A list
        of language codes can be found
        <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">
          here </a
        >.
      </p>
      <p>
        Flutter localization can be separated into three parts:
        <span class="italic">language code</span>,
        <span class="italic">script code</span>, and
        <span class="italic">country code</span>. Most languages will only
        require <span class="italic">language code</span> to be specified.
      </p>
      <br />
      <ul class="list-disc">
        <li>
          For languages without dialects or region-specific such as German, the
          language code will be "de".
        </li>
        <li>
          For languages with dialects (macrolanguages) such as Chinese, the
          language code will be "zh".
          <br />
          Chinese has different scripts, simplified and traditional. The script
          for simplified is "Hans", and the script for traditional is "Hant".
          <br />
          The country code should be in capital letters of the region, such as
          "CN" for China, "HK" for Hong Kong, and "TW" for Taiwan.
          <br />
          Separate the language code, script code and country code with an
          underscore.
          <br />
          For example, "zh_Hans_CN" for simplified Chinese in China.
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  name: "Guide",
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>
