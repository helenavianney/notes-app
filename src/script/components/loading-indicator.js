import { animate } from 'motion';

class LoadingIndicator extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9999;
                justify-content: center;
                align-items: center;
            }

            .loading-content {
                background: white;
                padding: 24px;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

            .loading-text {
                color: #1e293b;
                font-size: 1rem;
                margin: 0;
            }
        `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = "";
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
            <div class="loading-content">
                <p class="loading-text">Memuat...</p>
            </div>
        `;
  }

  show() {
    this.style.display = "flex";
    animate(
      this,
      { opacity: [0, 1] },
      { duration: 0.3 }
    );
  }

  hide() {
    animate(
      this,
      { opacity: [1, 0] },
      { duration: 0.3 }
    ).finished.then(() => {
      this.style.display = "none";
    });
  }
}

customElements.define("loading-indicator", LoadingIndicator);
