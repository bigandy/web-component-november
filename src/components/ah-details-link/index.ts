import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import { BACK_ICON, FORWARD_ICON, COPY_ICON } from "../../constants/icons";

declare global {
  interface HTMLElementTagNameMap {
    "ah-details-link": AHDetailsLink;
  }
}

/**
 * An ah-details-link element.
 * @slot - This element has a slot
 */
@customElement("ah-details-link")
export class AHDetailsLink extends LitElement {
  @property()
  id: string = "";

  @property()
  title: string = "";

  @property()
  date: string = "";

  @property()
  summary: string = "";

  @property()
  prev?: string;

  @property()
  next?: string;

  @property({ type: Boolean })
  open = false;

  static styles = css`
    h3 {
      cursor: pointer;
    }

    h3 svg {
      fill: black;
      height: 20px;
      aspect-ratio: 1;
      transition: fill 0.3s ease-in-out;
    }

    h3:hover svg {
      fill: lightgray;
    }

    .link {
      position: fixed;
      top: 50%;
      transition: fill 0.3s ease-in-out;
    }

    .link:hover {
      fill: orangered;
    }

    .link--prev {
      left: 0;
    }

    .link--next {
      right: 0;
    }

    .vh {
      border: 0;
      clip: rect(0, 0, 0, 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
  `;

  constructor() {
    super();

    window.addEventListener("hashchange", () => {
      // console.log("hash has changed");
      if ("#" + this.id === window.location.hash) {
        this.open = true;
      } else {
        this.open = false;
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();

    if ("#" + this.id === window.location.hash) {
      this.open = true;
    }
  }

  handleNextClick() {
    window.location.hash = "#" + this.next;
  }

  handlePrevClick() {
    window.location.hash = "#" + this.prev;
  }

  async handleDateClick() {
    window.location.hash = "#" + this.id;

    // add the url to the clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      console.log("Content copied to clipboard", window.location.href);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  render() {
    return html`
      <h3 id=${this.id} @click=${this.handleDateClick}>
        ${this.date}${COPY_ICON}
      </h3>

      <details .open=${this.open}>
        <summary>${this.summary}</summary>

        <slot></slot>

        ${this.prev
          ? html`<a
              class="link link--prev"
              href="#${this.prev}"
              @click=${this.handlePrevClick}
              >${BACK_ICON}<span class="vh">previous</span></a
            >`
          : null}
        ${this.next
          ? html`<a
              class="link link--next"
              href="#${this.next}"
              @click=${this.handleNextClick}
              >${FORWARD_ICON}<span class="vh">next</span></a
            >`
          : null}
      </details>
    `;
  }
}
