class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _updatedStyle() {
        this._style.textContent = `
            :host {
                display: block;
                width: 100%;
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                color: white;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1000;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

            .brand-name {
                text-align: center;
                padding: 12px;
                font-size: 1.5rem;
                font-weight: 700;
                letter-spacing: -0.025em;
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updatedStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div>
                <h1 class="brand-name">Notes App</h1>
            </div>
        `;
    }
}

customElements.define('app-bar', AppBar);