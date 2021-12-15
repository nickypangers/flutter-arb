export const getLanguageFromName = (file) => {
  const filename = file.name.split(".")[0];
  const language = filename.replace("app_", "");
  return language;
};

export const getContentFromFile = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(file, "UTF-8");
  });
};
