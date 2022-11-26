import { LitElement } from "lit";
declare global {
    interface HTMLElementTagNameMap {
        "ah-image-game": AHImageGame;
    }
}
/**
 * An ah-image-game element.
 * @slot - This element has a slot
 */
export declare class AHImageGame extends LitElement {
    columns: number;
    rows: number;
    boardState: number[];
    initialBoardState: number[];
    winner: boolean;
    imageSrc: string;
    randomize: boolean;
    activeCell: number;
    private totalCells;
    connectedCallback(): void;
    shuffleArray(array: any[]): any[];
    checkIfWon(): void;
    handleCell(cell: number): void;
    checkIfCanActivate(cell: number): boolean | undefined;
    generateBoard(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
