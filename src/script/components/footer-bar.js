class FooterBar extends HTMLElement {
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
                background: #1e293b;
                color: #94a3b8;
                border-top: 1px solid #334155;
                margin-top: 40px;
            }
            
            div {
                padding: 12px;
            }

            .copyright {
                text-align: center;
                font-size: 0.875rem;
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
                <p class="copyright">&copy; 2025 by Helena</p>
            </div>
        `;
    }
}

customElements.define('footer-bar', FooterBar);