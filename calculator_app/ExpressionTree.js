class Node {
    constructor(value, left, right) {
        this.value = value;
        this.left = left || null;
        this.right = right || null;
    }
}

export class ExpressionTree {
    constructor(node) {
        this.root = node || null;
    }

    
    isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }

    constructTree(postfixExpression) {
        const stack = [];
        const tokens = postfixExpression.split(" ");

        for (const token of tokens) {
          if (!this.isOperator(token)) {
            stack.push(new Node(token));
          } else {
            const right = stack.pop();
            const left = stack.pop();
            const operatorNode = new Node(token, left, right);
            stack.push(operatorNode);
          }
        }
      
        this.root = stack.pop();
        return this.root;
    }

    evaluateTree(node = this.root) {
        if (!node.left && !node.right) {
            return parseInt(node.value);
        }
    
        const leftValue = this.evaluateTree(node.left);
        const rightValue = this.evaluateTree(node.right);
    
        switch (node.value) {
            case '+': return parseInt(leftValue + rightValue);
            case '-': return parseInt(leftValue - rightValue);
            case '*': return parseInt(leftValue * rightValue);
            case '/': return parseInt(leftValue / rightValue);
        }
    }
}
