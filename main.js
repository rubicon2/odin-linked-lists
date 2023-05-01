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
        if (!this.isIndexValid(index, `LinkedList.insertAt(value, index) called with an invalid index: ${index}. Min is 0, max is ${this.size() - 1}`))
            return;
        
        let subsequentNode = this.at(index);
        let previousNode = this.at(index - 1);
        let newNode = new Node(value, subsequentNode);
        if (previousNode)
            previousNode.nextNode = newNode;
        else
            this.headNode = newNode;
    }

    removeAt(index) {
        // Odin just says 'remove the node at the given index' but I will return it at the end of the function like you would with a pop()

        // Make sure the headNode cannot be removed, so consistent with pop()
        let size = this.size();
        if (size <= 1 || !this.isIndexValid(index, `LinkedList.RemoveAt(value, index) called with an invalid index: ${index}. Min is 0, max is ${size - 1}`))
            return null;

        let previousNode = this.at(index - 1);
        // Do not get thisNode from previousNode.nextNode - previousNode could be null!
        let thisNode = this.at(index);
        let subsequentNode = thisNode.nextNode;

        if (previousNode)
            previousNode.nextNode = subsequentNode;
        else
            this.headNode = subsequentNode;
        
        return thisNode;
    }

    isIndexValid(index, errorMessage) {
        if (index < 0 || index >= this.size()) {
            console.warn(errorMessage);
            return false;
        } else 
            return true;
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
