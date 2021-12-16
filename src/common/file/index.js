export const getLanguageFromName = (file) => {
  const filename = file.name.split(".")[0];
  const language = filename.replace("app_", "");
  return language;
};

export const getContentFromFile = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    reader.onload = () => {
      resolve(JSON.parse(reader.result));
    };
    reader.readAsText(file);
  });
};

export const contentObjectToEditable = (contentObject, keys) => {
  let editable = {};
  let languages = Object.keys(contentObject);
  keys.forEach((key) => {
    if (typeof editable[key] === "undefined") {
      editable[key] = {};
    }
    languages.forEach((language) => {
      editable[key][language] = contentObject[language][key];
    });
  });
  return editable;
};
