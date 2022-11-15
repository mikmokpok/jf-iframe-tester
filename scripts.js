const textarea = document.querySelector("textarea");
const optionsBox = document.querySelector("ul");

//event listeners

document.querySelector("#add-scrolling").addEventListener("change", (e) => {
  let textareaVal = textarea.value;
  if (e.target.checked) {
    const newTextareaVal = textareaVal.replace(
      'scrolling="no"',
      'scrolling="yes"'
    );
    textarea.value = newTextareaVal;
  } else {
    const newTextareaVal = textareaVal.replace(
      'scrolling="yes"',
      'scrolling="no"'
    );
    textarea.value = newTextareaVal;
  }
});

document
  .querySelector("#disable-auto-scroll")
  .addEventListener("change", (e) => {
    let textareaVal = textarea.value;
    if (e.target.checked) {
      const newTextareaVal = textareaVal.replace(
        'onload="window.parent.scrollTo(0,0)"',
        'onload=""'
      );
      textarea.value = newTextareaVal;
    } else {
      const newTextareaVal = textareaVal.replace(
        'onload=""',
        'onload="window.parent.scrollTo(0,0)"'
      );
      textarea.value = newTextareaVal;
    }
  });

document.querySelector("#add-parameters").addEventListener("change", (e) => {
  let textAreaVal = textarea.value;
  if (e.target.checked) {
    addParamSlots();
    document
      .querySelector("#dynamicInputButtons")
      .setAttribute("style", "display:flex");
    document.querySelector("#applyPrefills").removeAttribute("disabled");
    document.querySelector("#applyPrefills").removeAttribute("class");
  } else {
    document
      .querySelector("#dynamicInputButtons")
      .setAttribute("style", "display:none");
    const newTextAreaVal = textAreaVal.replace(getStringBuilder(), "");
    document.querySelectorAll(".dynamicInput").forEach((n) => n.remove());
    textarea.value = newTextAreaVal;
  }
});

document.querySelector("#fix-cutoff").addEventListener("change", (e) => {
  let textAreaVal = textarea.value;
  if (e.target.checked) {
    document
      .querySelector("#cutoff-buttons")
      .setAttribute("style", "display:flex;");
  } else {
    document.querySelector("#offset").value = "";
    document
      .querySelector("#cutoff-buttons")
      .setAttribute("style", "display:none;");
    textarea.value = replaceText(
      textAreaVal,
      "iframe.style.height = ",
      'args[1] + "px";',
      ""
    );
  }
});

document
  .querySelector("#change-fallback-height")
  .addEventListener("change", (e) => {
    let textAreaVal = textarea.value;
    if (e.target.checked) {
      document
        .querySelector("#fallback-height")
        .setAttribute("style", "display:flex;");
    } else {
      document.querySelector("#offset").value = "";
      document
        .querySelector("#fallback-height")
        .setAttribute("style", "display:none;");
      textarea.value = replaceText(textAreaVal, "height:", "px;", `539`);
    }
  });

document
  .querySelector("#fallback-height-input")
  .addEventListener("change", (e) => {
    let textAreaVal = textarea.value;
    textarea.value = replaceText(
      textAreaVal,
      "height:",
      "px;",
      `${e.target.value}`
    );
  });

document.querySelector("#offset").addEventListener("change", (e) => {
  let textAreaVal = textarea.value;
  textarea.value = replaceText(
    textAreaVal,
    "iframe.style.height = ",
    'args[1] + "px";',
    `${e.target.value} + +`
  );
});

document
  .querySelector("#fix-ty-page-height")
  .addEventListener("change", (e) => {
    let textAreaVal = textarea.value;
    if (e.target.checked) {
      textarea.value = replaceText(
        textAreaVal,
        'var ifr = document.getElementById("JotFormIFrame-',
        "if (ifr) {",
        `\n
    let c=0;
    ifr.onload = (e=>{
     if(c==0){
          c++;
     }else{
        ifr.style.height="529px";
    }
    }); \n`
      );
    } else {
      const newTextAreaVal = textAreaVal.replace(
        `
    let c=0;
    ifr.onload = (e=>{
     if(c==0){
          c++;
     }else{
        ifr.style.height="529px";
    }
    });`,
        ""
      );
      textarea.value = newTextAreaVal;
    }
  });

document
  .querySelector("#add-sandbox-attribute")
  .addEventListener("change", (e) => {
    let textAreaVal = textarea.value;
    if (e.target.checked) {
      textarea.value = replaceText(
        textAreaVal,
        'scrolling="no"',
        ">",
        `\n sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"​ \n`
      );
    } else {
      const newTextAreaVal = textAreaVal.replace(
        `
    sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"​`,
        ""
      );
      textarea.value = newTextAreaVal;
    }
  });

document.querySelector("#add-more-button").addEventListener("click", () => {
  addParamSlots();
});

document.querySelector("#applyPrefills").addEventListener("click", (e) => {
  let textareaVal = textarea.value;
  const stringBuilder = getStringBuilder();
  const anchorIndex =
    textareaVal.indexOf('iframeParams.push("isIframeEmbed=1");') + 38;
  let newTextareaVal =
    textareaVal.substr(0, anchorIndex) +
    "\n" +
    stringBuilder +
    textareaVal.substr(anchorIndex);
  textarea.value = newTextareaVal;
  e.target.setAttribute("disabled", "true");
  e.target.setAttribute("class", "disabled");
});

document.querySelector("#copy-code").addEventListener("click", (e) => {
  navigator.clipboard.writeText(textarea.value);
});

//helper functions
const addParamSlots = () => {
  const anchor = document.querySelector("#dynamicInputButtons");
  let li = document.createElement("li");
  li.setAttribute("class", "dynamicInput");
  let input1 = document.createElement("input");
  let input2 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("class", "prefillKey");
  input1.setAttribute("placeholder", "Field Name");
  input2.setAttribute("type", "text");
  input2.setAttribute("class", "prefillValue");
  input2.setAttribute("placeholder", "Value");
  li.appendChild(input1);
  li.appendChild(input2);
  optionsBox.insertBefore(li, anchor);
};

const getStringBuilder = () => {
  const keys = document.querySelectorAll(".prefillKey");
  const values = document.querySelectorAll(".prefillValue");
  let stringBuilder = "";
  for (let i = 0; i < keys.length; i++) {
    stringBuilder += `iframeParams.push("${keys[i].value}=${values[i].value}"); \n`;
  }
  return stringBuilder;
};

const replaceText = (textAreaVal, anchorString, endString, appendedString) => {
  const anchorIndex = textAreaVal.indexOf(anchorString) + anchorString.length;
  const endIndex = textAreaVal.indexOf(endString);
  let newTextAreaVal =
    textAreaVal.substr(0, anchorIndex) +
    `${appendedString}​` +
    textAreaVal.substr(endIndex);
  return newTextAreaVal;
};
