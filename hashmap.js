const util = require('util')

class ListNode {
    constructor(key, value = null, nextNode = null) {
        this.key = key
        this.value = value
        this.nextNode = nextNode
    }
}

class LinkedLists {
    constructor(head = null) {
        this.head = head
    }

    append(key, value) {
        let node = new ListNode(key, value)

        // If head is empty, then append to head as first element.
        if(!this.head) {
            this.head = node
            return
        }

        //else, get current head, iterate until last nextNode and append.
        let current = this.head

        // if in case the key matches the key of current element, then change key's value.
        if(current.key === key) {
            current.value = value
            return
        }

        // Keep iterating until next node.
        while(current.nextNode) {
            current = current.nextNode
        }

        current.nextNode = node
    }

    prepend(value) {
        let node = new ListNode(value)

        //Get the old head.
        let oldHead = this.head
        //Set head to new node.
        this.head = node
        //Set new head's next node to old head.
        this.head.nextNode = oldHead
    }

    size() {
        let current = this.head
        let size = 0

        while(current.nextNode) {
            size++
            current = current.nextNode
        }

        // To count last node too since while loop exits when last node null.
        size++

        console.log(`Size of list: ${size}`)
    }

    headNode() {
        console.log(`Head of list: ${this.head.value}`)
    }

    tailNode() {
        let current = this.head

        while(current.nextNode) {
            current = current.nextNode
        }

        console.log(`Last node in list: ${current.value}`)
    }

    at(index) {
        let current = this.head
        let indexCounter = 0

        while(current.nextNode) {
            if(indexCounter === index) {
                console.log(`Value at index ${index} is '${current.value}'`)
                return
            }
            indexCounter++
            current = current.nextNode
        }
    }

    pop() {
        let current = this.head

        while(current.nextNode) {
            if(current.nextNode.nextNode === null) {
                current.nextNode = null
                return
            }
            current = current.nextNode
        }
    }

    contains(value) {
        let current = this.head

        while(current.nextNode) {
            if(current.value === value) {
                console.log('Yes, value present!')
                return
            }
            current = current.nextNode
        }
        console.log('No, value not present!')
    }

    find(value) {
        let current = this.head
        let indexCounter = 0

        while(current.nextNode) {
            if(current.value === value) {
                console.log(`value '${value}' found at index ${indexCounter}`)
                return
            }
            current = current.nextNode
            indexCounter++
        }

        console.log(`value ${value} not present!`)
    }

    toString() {
        let current = this.head

        // Printing the first element.
        console.log(current.value)

        while(current.nextNode || current.nextNode === null) {
            console.log(current.nextNode)
            current = current.nextNode
        }
    }

}

class hashMap {
    constructor(buckets) {
        this.buckets = buckets
    }

    hashAndGetBucketIndex(key) {
        let hashCode = 0
        const primeNum = 31;
        let buckets = this.buckets

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % 16
        }

        return buckets[hashCode]
    }

    // Sets key-value pair in hash map.
    set(key, value) {
        let bucket = this.hashAndGetBucketIndex(key)
        bucket.append(key, value)
    }

    // Takes one argument as a key and returns the value that is assigned to this key.
    // If a key is not found, return null.
    get(key) {
        let bucket = this.hashAndGetBucketIndex(key)
        let currentElement = bucket.head

        // If key is present in head itself,
        if(currentElement === null) {
            return 'Key does not exist.'
        }

        // If key is present in head itself,
        if(currentElement.key === key) {
            return currentElement.value
        }

        // else keep iterating until next node is null
        while(!currentElement.nextNode === null) {
            if(currentElement.nextNode.key === key) {
                return currentElement.nextNode.value
            }
            currentElement = currentElement.nextNode
        }

        return 'Key does not exist.'
    }

    // Checks if key exists.
    has(key) {
        let bucket = this.hashAndGetBucketIndex(key)
        let currentElement = bucket.head

        // If key is present in head itself,
        if(currentElement === null) {
            return 'Key does not exist.'
        }

        // If key is present in head itself,
        if(currentElement.key === key) {
            return 'Key exists!'
        }

        // else keep iterating until next node is null
        while(!currentElement.nextNode === null) {
            if(currentElement.nextNode.key === key) {
                return 'Key exists!'
            }
            currentElement = currentElement.nextNode
        }

        return 'Key does not exist.'
    }

    // Remove the key-value pair from the hashmap if it exists.
    remove(key) {
        let bucket = this.hashAndGetBucketIndex(key)
        let currentElement = bucket.head

        // If key is present in head itself,
        if(currentElement === null) {
            return false
        }

        // If key is present in head itself,
        if(currentElement.key === key) {
            bucket.head = null
            return true
        }

        // Else iterate until key is either found or not.
        while(currentElement.nextNode) {
            if(currentElement.nextNode.key === key) {
                currentElement.nextNode = null
                return true
            }
            currentElement = currentElement.nextNode
        }

        return false
    }

    // the number of stored keys in the hash map.
    length() {
        let keyCount = 0
        // let bucket = null
        let currentElement = null

        // for (let i = 0; i < buckets.length; i++) {
        //     bucket = buckets[i]
        //     currentElement = bucket.head
        //
        //     if(currentElement !== null) {
        //         // Counting the head
        //         keyCount = keyCount + 1
        //         while(currentElement.nextNode) {
        //             // Counting the nodes that is after head.
        //             keyCount = keyCount + 1
        //             currentElement = currentElement.nextNode
        //         }
        //     }
        // }

        for(const bucket of this.buckets) {
            currentElement = bucket.head

            if(currentElement !== null) {
                while(currentElement) {
                    keyCount++
                    currentElement = currentElement.nextNode
                }
            }
        }

        return keyCount
    }

    clear() {
        for(let i = 0; i < this.buckets.length; i++) {
            buckets[i] = new LinkedLists()
        }
    }

    // the number of stored keys in the hash map.
    keys() {
        let currentElement = null
        let keyArr = []

        for(const bucket of this.buckets) {
            currentElement = bucket.head

            if(currentElement !== null) {
                while(currentElement) {
                    keyArr.push(currentElement.key)
                    currentElement = currentElement.nextNode
                }
            }
        }

        return keyArr
    }

    // the number of stored keys in the hash map.
    values() {
        let currentElement = null
        let keyArr = []

        for(const bucket of this.buckets) {
            currentElement = bucket.head

            if(currentElement !== null) {
                while(currentElement) {
                    keyArr.push(currentElement.value)
                    currentElement = currentElement.nextNode
                }
            }
        }

        return keyArr
    }

    entries() {
        let currentElement = null
        let keyAndValueArr = []

        for(const bucket of this.buckets) {
            currentElement = bucket.head

            if(currentElement !== null) {
                while(currentElement) {
                    keyAndValueArr.push([currentElement.key, currentElement.value])
                    currentElement = currentElement.nextNode
                }
            }
        }

        return keyAndValueArr
    }
}

// The buckets array.
let buckets = Array.apply(null, Array(16)).map(function () {})

for(let i = 0; i < buckets.length; i++) {
    buckets[i] = new LinkedLists()
}

let hashMapOne = new hashMap(buckets)

// Setting key-value pairs in the hash map
hashMapOne.set('Sara', 'I am Sara')
hashMapOne.set('raSa', 'I am raSa')
hashMapOne.set('Mazin', 'I am Mazin')

// Getting value of key 'Mazin'
console.log(hashMapOne.get('Mazin'))

// Checking if key 'Mazin' exists in the hashmap.
console.log(hashMapOne.has('Mazin'))

// Removing key-value pair from hashmap.
// console.log(hashMapOne.remove('Mazin'))
// console.log(hashMapOne.remove('raSa'))

// Number of keys in hashmap
console.log(hashMapOne.length())

// Clearing the entire hash map.
// hashMapOne.clear()

// All keys in arr
console.log(hashMapOne.keys())

// All values in arr
console.log(hashMapOne.values())

// Printing the hashmap.
console.log(hashMapOne.entries())
