export const getPrefillBuilder = (prefills) => {
  let stringBuilder = "";
  prefills.forEach((n) => {
    stringBuilder += `iframeParams.push("${n.key}=${n.value}");\n`;
  });
  return stringBuilder;
};

export const insertText = (
  text,
  anchorString,
  endString,
  appendedString,
  offset = 0
) => {
  const anchorIndex = text.indexOf(anchorString) + anchorString.length + offset;
  const endIndex = text.indexOf(endString);
  let newText =
    text.substr(0, anchorIndex) + `${appendedString}` + text.substr(endIndex);
  return newText;
};

export const handleApply = (
  option,
  code,
  textFieldValue,
  setTextFieldValue,
  setCode
) => {
  let codeOutput;
  switch (option) {
    case "prefill":
      codeOutput = insertText(
        code,
        'iframeParams.push("isIframeEmbed=1");',
        'ifr.src = src + "?"',
        `\n${getPrefillBuilder(textFieldValue)}`
      );
      break;
    case "cutoff":
      codeOutput = insertText(
        code,
        "iframe.style.height = ",
        'args[1] + "px";',
        `${textFieldValue.value} + +`
      );
      break;
    case "typage":
      codeOutput = insertText(
        code,
        'var ifr = document.getElementById("JotFormIFrame-',
        "if (ifr) {",
        `\n
        let c=0;
        ifr.onload = (e=>{
         if(c==0){
              c++;
         }else{
            ifr.style.height="529px";
            ifr.scrollTo(0,0);
        }
        }); \n`,
        18
      );
      break;
    case "autoscroll":
      codeOutput = code.replace(
        'onload="window.parent.scrollTo(0,0)"',
        'onload=""'
      );
      break;
    case "scrolling":
      codeOutput = code.replace('scrolling="no"', 'scrolling="yes"');
      break;
    case "fallback":
      codeOutput = insertText(code, "height:", "px;", textFieldValue.value);
      break;
    case "sandbox":
      codeOutput = insertText(
        code,
        "scrolling=",
        ">",
        `sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" \n`,
        6
      );
      break;
  }
  setCode(codeOutput);
};

export const handleUnchecked = (
  option,
  code,
  textFieldValue,
  setTextFieldValue,
  setCode
) => {
  let codeOutput;
  switch (option) {
    case "prefill":
      codeOutput = insertText(
        code,
        'iframeParams.push("isIframeEmbed=1");',
        'ifr.src = src + "?"',
        "\n"
      );
      setTextFieldValue([{ key: "", value: "" }]);
      break;
    case "cutoff":
      codeOutput = insertText(
        code,
        "iframe.style.height = ",
        'args[1] + "px";',
        ""
      );
      break;
    case "typage":
      codeOutput = insertText(code, "let c=0;", "if (ifr)", "\n", -9);
      break;
    case "autoscroll":
      codeOutput = code.replace(
        'onload=""',
        'onload="window.parent.scrollTo(0,0)"'
      );
      break;
    case "scrolling":
      codeOutput = code.replace('scrolling="yes"', 'scrolling="no"');
      break;
    case "fallback":
      codeOutput = insertText(code, "height:", "px;", "539");
      break;
    case "sandbox":
      codeOutput = code.replace(
        'sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"',
        ""
      );
      break;
  }
  setCode(codeOutput);
};
