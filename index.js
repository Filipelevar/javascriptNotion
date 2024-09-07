const FORMAT_OPTIONS = [
  {
    id: "h1",
    text: "Heading 1",
    className: "h1",
    tag: "h1",
  },
  {
    id: "expandable-h1",
    text: "Expandable Heading 1",
    className: "h1",
    tag: "h1",
  },
];

function renderOptionDropdown(formatOption) {
  return `
    <div class="dropdown-option" data-format="${formatOption.id}">
         <img src="./assets/iconT.png" alt="T Icon" class="dropdown-option-icon" />
         <div class="dropdown-option-text">
            <span>${formatOption.text}</span>
            <p>Shortcut: type # + space</p>
         </div>
        
    </div>
  `;
}

function headerDropDown() {
  return `
    <div class="dropdown-header">
        <h3>Add Blocks</h3>
        <p>Keep typing to filter, or escape to exit</p>
        <span>Filtering keyword 1</span> 
    </div>
  `;
}

function getFormatNumber(formatId) {
  switch (formatId) {
    case "h1":
      return 1;
    case "expandable-h1":
      return 2;
    default:
      return "";
  }
}

const DEFAULT_PLACEHOLDER = "Type / for blocks, @ to link docs or people";

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  function createInput() {
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("dynamic-input");
    input.placeholder = DEFAULT_PLACEHOLDER;

    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    inputContainer.appendChild(input);
    inputContainer.appendChild(dropdown);
    content.appendChild(inputContainer);

    let selectedFormat = "h1";
    let showDropdownMenu = false;

    input.addEventListener("input", (e) => {
      const value = e.target.value.trim();
      if (value[0] === "/") {
        showDropdownMenu = true;
        const filter = value.substring(1);
        showDropdown(filter);
      } else {
        hideDropdown();
        showDropdownMenu = false;
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const value = input.value.trim();
        const formatKey = value.match(/^\/(\d)$/);

        if (formatKey) {
          const formatNumber = formatKey[1];

          const selectedFormat = FORMAT_OPTIONS.find((item) =>
            item.text.endsWith(formatNumber)
          );

          if (selectedFormat) {
            applyFormatting(selectedFormat);
            input.value = "";
            hideDropdown();
            e.preventDefault();
          }
        } else if (value[0] === "/" && !formatKey) {
          const formatStringKey = value.substring(1);
          if (FORMAT_OPTIONS.find((item) => item.id === formatStringKey)) {
            applyFormatting(formatStringKey);
            createInput();
            hideDropdown();
            e.preventDefault();
          }
        } else {
          applyInputFormatting(value);
          createInput();
          hideDropdown();
          e.preventDefault();
        }
      } else if (e.key === " " && input.value.trim().endsWith("#")) {
        e.preventDefault();
        input.value = input.value.trim().slice(0, -1);
        applyFormatting({
          id: "h1",
          text: "Heading 1",
          className: "h1",
          tag: "h1",
        });
        input.focus();
        hideDropdown();
      } else if (e.key === "Backspace") {
        const value = input.value.trim();
        if (value === "") {
          e.preventDefault();
          const inputContainers = Array.from(
            content.getElementsByClassName("input-container")
          );
          const inputIndex = inputContainers.indexOf(input.parentElement);

          if (inputIndex === 0) {
            input.value = "";
            input.setAttribute("placeholder", DEFAULT_PLACEHOLDER);
            input.classList.remove(
              ...FORMAT_OPTIONS.map((opt) => opt.className)
            );
            input.focus();
            currentInput = input;
          } else if (inputIndex > 0) {
            content.removeChild(input.parentElement);
            const prevInput =
              inputContainers[inputIndex - 1].querySelector(".dynamic-input");
            if (prevInput) {
              prevInput.focus();
            }
          }
        }
      }
    });

    function applyInputFormatting(value) {
      if (value !== "") {
        if (selectedFormat) {
          input.setAttribute("contenteditable", "true");
          const option = FORMAT_OPTIONS.find(
            (item) => item.id === selectedFormat.id
          );

          if (option) {
            input.innerHTML = `<${option.tag}>${value}</${option.tag}>`;
            input.placeholder = option.text;
          }
        } else {
          input.innerHTML = value;
          input.placeholder = DEFAULT_PLACEHOLDER;
        }
        selectedFormat = "";
      }
    }

    function applyFormatting(selectedOption) {
      selectedFormat = selectedOption;
      if (currentInput) {
        const option = FORMAT_OPTIONS.find(
          (item) => item.id === selectedOption.id
        );

        currentInput.setAttribute("placeholder", option.text);
        currentInput.classList.remove(
          ...FORMAT_OPTIONS.map((opt) => opt.className)
        );
        currentInput.classList.add(option.className);
        currentInput.focus();
      }
    }

    function showDropdown(filter = "") {
      dropdown.innerHTML = "";
      dropdown.classList.add("visible");
      dropdown.innerHTML = headerDropDown();
      FORMAT_OPTIONS.forEach((item) => {
        if (item.text.toLowerCase().includes(filter.toLowerCase())) {
          const option = document.createElement("div");
          option.innerHTML = renderOptionDropdown(item);
          dropdown.appendChild(option);
        }
      });

      if (dropdown.childElementCount === 1) {
        hideDropdown();
      }
    }

    function hideDropdown() {
      dropdown.classList.remove("visible");
    }

    dropdown.addEventListener("click", (e) => {
      const optionElement = e.target.closest(".dropdown-option");
      if (optionElement) {
        const selectedOptionId = optionElement.getAttribute("data-format");
        const selectedOption = FORMAT_OPTIONS.find(
          (item) => item.id === selectedOptionId
        );
        if (selectedOption) {
          applyFormatting(selectedOption);
          input.value = "";
          hideDropdown();
        }
      }
    });

    currentInput = input;
    input.focus();
  }

  createInput();
});
