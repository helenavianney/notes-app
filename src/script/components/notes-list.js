class NotesList extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _notes = [];

    static get observedAttributes() {
        return ['empty-message'];
    }

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
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

            .notes-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 24px;
            }

            .note-item {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 16px;
                padding: 24px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }

            .note-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #6366f1, #f59e0b);
            }

            .note-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.15);
            }

            .note-title {
                margin: 0 0 12px 0;
                color: #1e293b;
                font-size: 1.25rem;
                font-weight: 600;
                line-height: 1.3;
            }

            .note-date {
                color: #64748b;
                font-size: 0.875rem;
                margin: 0 0 16px 0;
                font-weight: 500;
            }

            .note-body {
                color: #475569;
                line-height: 1.6;
                margin: 0;
            }

            .empty-state {
                grid-column: 1 / -1;
                text-align: center;
                color: #64748b;
                padding: 64px 24px;
                background: #ffffff;
                border: 2px dashed #e2e8f0;
                border-radius: 16px;
            }

            .empty-state p {
                font-size: 1.125rem;
                font-weight: 500;
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    set notes(value) {
        this._notes = value;
        this.render();
    }

    get notes() {
        return this._notes;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);

        if (this._notes.length === 0) {
            this._shadowRoot.innerHTML += `
                <div class="empty-state">
                    <p>${this.getAttribute('empty-message')}</p>
                </div>
            `;
        } else {
            const notesHTML = this._notes.map(note => `
                <div class="note-item">
                    <h3 class="note-title">${note.title}</h3>
                    <p class="note-date">${new Date(note.createdAt).toLocaleDateString('id-ID')}</p>
                    <p class="note-body">${note.body}</p>
                </div>
            `).join('');

            this._shadowRoot.innerHTML += `
                <div class="notes-container">
                    ${notesHTML}
                </div>
            `;
        }
    }
}

customElements.define('notes-list', NotesList);