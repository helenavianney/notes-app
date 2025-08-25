class InputDetail extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ["min-height", "rows"];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: block;
                width: 100%;
            }

            #noteBody {
                width: 100%;
                padding: 16px;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                font-size: 14px;
                min-height: ${this.getAttribute("min-height") || "120px"};
                resize: vertical;
                font-family: inherit;
                transition: all 0.2s ease;
                background: #ffffff;
                box-sizing: border-box;
            }

            #noteBody:focus {
                outline: none;
                border-color: #6366f1;
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            }
        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
            <textarea id="noteBody" name="body" placeholder="Tulis catatan di sini" rows="${this.getAttribute("rows") || "5"}" required aria-describedby="body-error"></textarea>
            <div id="body-error" style="color: #ef4444; font-size: 0.875rem; margin-top: 4px; min-height: 20px;"></div>
        `;

    this._setupValidation();
  }

  _setupValidation() {
    const textarea = this._shadowRoot.getElementById("noteBody");
    const errorEl = this._shadowRoot.getElementById("body-error");

    const customValidationHandler = (event) => {
      event.target.setCustomValidity("");

      if (event.target.validity.valueMissing) {
        event.target.setCustomValidity("Wajib diisi");
        return;
      }
    };

    const showValidationMessage = (event) => {
      const isValid = event.target.validity.valid;
      const errorMessage = event.target.validationMessage;

      if (errorMessage && !isValid) {
        errorEl.innerText = errorMessage;
      } else {
        errorEl.innerText = "";
      }
    };

    textarea.addEventListener("input", customValidationHandler);
    textarea.addEventListener("invalid", customValidationHandler);
    textarea.addEventListener("blur", showValidationMessage);
  }
}

customElements.define("input-detail", InputDetail);
