class LinkedList {
    constructor(...listValues) {
        this.headNode = new Node(listValues.shift());
        let previousNode = this.headNode;
        for(const value of listValues) {
            previousNode.nextNode = new Node(value);
            previousNode = previousNode.nextNode;
        }
    }

    append(value) {
        this.tail().nextNode = new Node(value);
    }

    prepend(value) {
        this.headNode = new Node(value, this.headNode);
    }

    insertAt(value, index) {

    }

    removeAt(index) {

    }

    size() {
        let nodeCount = 1;
        let currentNode = this.headNode;
        while(currentNode.nextNode != null) {
            nodeCount++;
            currentNode = currentNode.nextNode;
        }
        return nodeCount;
    }

    head() {
        return this.headNode;
    }

    tail() {
        return this.at(this.size() - 1);
    }

    at(index) {
        // If index is out of bounds of list, don't bother
        if (index < 0 || index >= this.size())
            return null;

        let i = 0;
        let currentNode = this.headNode;
        while (i < index) {
            currentNode = currentNode.nextNode;
            i++;
        }
        return currentNode;
    }


    pop() {
        // Method won't pop off headNode - only does anything if size is > 1
        // Get a reference to last node before prior node's nextNode is changed, so we can return it like in js array pop
        let lastNode = this.tail();
        let penultimateNode = this.at(Math.max(0, this.size() - 2));
        penultimateNode.nextNode = null;
        return lastNode;
    }

    contains(value) {
        let currentNode = this.headNode;
        while(currentNode) {
            if (currentNode.value === value)
                return true;
            currentNode = currentNode.nextNode;
        }
        return false;
    }

    find(value) {
        let currentNode = this.headNode;
        while(currentNode) {
            if (currentNode.value === value)
                return currentNode;
            currentNode = currentNode.nextNode;
        }
        return null;
    }

    toString() {
        // In format: ( value ) -> ( value ) -> null
        let s = '';
        let currentNode = this.headNode;
        while(currentNode) {
            s += `( ${currentNode.value} ) -> `
            currentNode = currentNode.nextNode;
        }
        return `${s} null `
    }
}

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}
