export const getPrefillBuilder = (prefills) => {
    let stringBuilder = "";
    prefills.forEach((n)=>{stringBuilder += `iframeParams.push("${n.key}=${n.value}"); \n`;});
    return stringBuilder;
  };

  export const insertText = (text,
    anchorString,
    endString,
    appendedString,
    offset = 0)=>{
    const anchorIndex = text.indexOf(anchorString) + anchorString.length + offset;  
    const endIndex = text.indexOf(endString);
    let newText = text.substr(0, anchorIndex) + `${appendedString}​` + text.substr(endIndex);
    return newText;
  }