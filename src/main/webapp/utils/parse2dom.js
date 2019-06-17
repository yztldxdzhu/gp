export const parse2dom = (str) => {
      let obj = document.createComment("div");
      obj.innerHTML = obj;
      return obj.childNodes;
};