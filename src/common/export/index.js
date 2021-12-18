export const exportToFiles = (content, lang) => {
  const object = convertEditableToObject(content, lang);
  const blob = new Blob([JSON.stringify(object)], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `app_${lang}.arb`;
  a.click();
};

const convertEditableToObject = (content, lang) => {
  let object = {};
  content.forEach((translation) => {
    object[translation[0]] = translation[1][lang];
  });
  return object;
};
