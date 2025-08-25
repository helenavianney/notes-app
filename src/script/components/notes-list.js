import { animate, stagger } from 'motion';

class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _notes = [];

  static get observedAttributes() {
    return ["empty-message"];
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
                opacity: 0;
                transform: translateY(20px);
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
                margin: 0 0 16px 0;
            }

            .note-actions {
                display: flex;
                gap: 8px;
            }

            .delete-btn {
                background: #ef4444;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.875rem;
                transition: background-color 0.2s;
            }

            .delete-btn:hover {
                background: #dc2626;
            }

            .archive-btn {
                background: #f59e0b;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.875rem;
                transition: background-color 0.2s;
            }

            .archive-btn:hover {
                background: #d97706;
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
    this._shadowRoot.innerHTML = "";
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
                    <p>${this.getAttribute("empty-message")}</p>
                </div>
            `;
    } else {
      const notesHTML = this._notes
        .map(
          (note) => `
                <div class="note-item">
                    <h3 class="note-title">${note.title}</h3>
                    <p class="note-date">${new Date(note.createdAt).toLocaleDateString("id-ID")}</p>
                    <p class="note-body">${note.body}</p>
                    <div class="note-actions">
                        <button class="archive-btn" data-id="${note.id}">📁 Arsip</button>
                        <button class="delete-btn" data-id="${note.id}">🗑️ Hapus</button>
                    </div>
                </div>
            `,
        )
        .join("");

      this._shadowRoot.innerHTML += `
                <div class="notes-container">
                    ${notesHTML}
                </div>
            `;

      this._setupDeleteButtons();
      this._setupArchiveButtons();
      this._animateNotes();
    }
  }

  _animateNotes() {
    const noteItems = this._shadowRoot.querySelectorAll('.note-item');
    
    animate(
      noteItems,
      {
        opacity: [0, 1],
        transform: ['translateY(20px)', 'translateY(0px)']
      },
      {
        duration: 0.5,
        delay: stagger(0.1)
      }
    );
  }

  _setupDeleteButtons() {
    const deleteButtons = this._shadowRoot.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const noteId = event.target.getAttribute("data-id");
        this.dispatchEvent(
          new CustomEvent("delete-note", {
            detail: { id: noteId },
            bubbles: true,
          }),
        );
      });
    });
  }

  _setupArchiveButtons() {
    const archiveButtons = this._shadowRoot.querySelectorAll(".archive-btn");
    archiveButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const noteId = event.target.getAttribute("data-id");
        this.dispatchEvent(
          new CustomEvent("archive-note", {
            detail: { id: noteId },
            bubbles: true,
          }),
        );
      });
    });
  }
}

customElements.define("notes-list", NotesList);
