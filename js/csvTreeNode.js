// Define a class to hold the CSV tree
export class CSVDefinedTreeNode {
    // constructor
    constructor(startPos, selfValue, elements) {
        this.startRow = startPos[0];
        this.startCol = startPos[1];
        this.selfValue = selfValue;
        this.elements = elements;
        this.children = [];
        this.parent = null;
    }

    // getter for the number of children
    get countOfChildren() {
        return this.children.length;
    }

    // getter for the number of elements
    get countOfElements() {
        return this.elements.length;
    }

    // getter for the self value
    get myValue() {
        return this.selfValue;
    }

    // getter for the cell position
    get myPosition() {
        return [this.startRow, this.startCol];
    }

    // getter for the children
    get myChildren() {
        return this.children;
    }

    // getter for the elements
    get myElements() {
        return this.elements;
    }

    // getter for the parent
    get myParent() {
        return this.parent;
    }

    // setter for the parent
    set myParent(parent) {
        this.parent = parent;
    }

    // method to add a child
    addChild(child) {
        this.children.push(child);
    }

    // method to add an element
    addElement(element) {
        this.elements.push(element);
    }

    // method to remove a child
    removeChild(child) {
        this.children.splice(this.children.indexOf(child), 1);
    }

    // method to remove an element
    removeElement(element) {
        this.elements.splice(this.elements.indexOf(element), 1);
    }

    // method to check if the node is a leaf
    amIALeaf() {
        return this.countOfChildren === 0;
    }

    // method to check if the node is a root
    amIARoot() {
        return this.parent === null;
    }

    // method to check if the node is a branch
    amIABranch() {
        return this.countOfChildren > 0;
    }

    // method to export self as a JSON object
    exportAsJSON() {
        return {
            startRow: this.startRow,
            startCol: this.startCol,
            selfValue: this.selfValue,
            elements: this.elements,
            children: this.children,
        };
    }
}