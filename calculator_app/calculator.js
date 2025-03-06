import { ExpressionTree } from "./ExpressionTree.js"

const numbersArr = Array.from(document.getElementsByClassName("number"));
const operatorsArr = Array.from(document.getElementsByClassName("operator"));
const parenthesisArr = Array.from(document.getElementsByClassName("parenthesis"));
const numberStrs = "0123456789".split("");

const data = {
    displayString: "0",
    appendStringNum: (newChar) => {
        if (newChar === ".") {
        //decimal + 0?
        }

        if (numberStrs.includes(newChar)) {
            if (data.displayString === "0") {
                data.displayString = "";
            }
            data.displayString += newChar;
        }
        data.updateDisplay();
    },

    appendStringOperator: (newChar) => {
        if ((numberStrs.includes(data.displayString.slice(-1)) || data.displayString.slice(-1) === ")")) {
            data.displayString += newChar;
        }
        data.updateDisplay();
    },

    appendStringParenthesis: (newChar) => {
        if (newChar === ")") {
        if (data.displayString.split("(").length <= data.displayString.split(")").length) {
            //if there are not enough open parenthesis to add a closing parenthesis terminate early
            return;
        }
        if (operatorsArr.map((operator) => operator.innerText).includes(data.displayString[data.displayString.length - 1])) {
            //early termination for adding parenthesis after operator
            return;
        }
        }
        if (data.displayString === "0") {
            data.displayString = "";
        }

        data.displayString += newChar;

        data.updateDisplay();
    },

    updateDisplay: () => {
        const display = document.getElementById("display");
        display.innerText = data.displayString;
    }, 

    infixToPostfix: (expression) => {
        const precedence = {
            '*': 2,
            '/': 2,
            "+": 1,
            "-": 1  
        }

        const stack = [];
        let output = "";
        let numBuffer = "";

        for(let i = 0; i < expression.length; i++) {
            let char = expression[i];

            if(numberStrs.includes(char)) {
                numBuffer += char;
            }
            else {
                if(numBuffer) {
                    output += numBuffer + " ";
                    numBuffer = "";
                }

                // if character is an operator
                if (char in precedence) {
                    while (stack.length && (precedence[char] <= precedence[stack[stack.length - 1]])) {
                        output += stack.pop() + " ";
                    }
                    stack.push(char);
                }
                else if (char === "(") {
                    stack.push(char);
                }
                else if (char === ")") {
                    while (stack.length && stack[stack.length - 1] !== '(') {
                        output += stack.pop();
                    } 
                    stack.pop();
                }
            }
        }

        if(numBuffer) {
            output += numBuffer + " ";
        }

        while(stack.length) {
            output += stack.pop() + " ";
        }
        
        return output.trim();
    },

    calculateDisplay: (infixExpression) => {
        const postfixExpression = data.infixToPostfix(infixExpression);
        const root = new ExpressionTree();

        root.constructTree(postfixExpression);

        data.displayString = "";
        data.displayString += root.evaluateTree();
        data.updateDisplay();
    }
};

const display = document.getElementById("display");
display.innerText = data.displayString;

numbersArr.map((elem) => {
    elem.addEventListener("click", () => {
        data.appendStringNum(elem.innerText);
    });
});

operatorsArr.map((elem) => {
    elem.addEventListener("click", () => {
        data.appendStringOperator(elem.innerText);
    });
});

parenthesisArr.map((elem) => {
    elem.addEventListener("click", () => {
        data.appendStringParenthesis(elem.innerText);
    });
});

const equalsOperator = document.querySelector(".equals");

equalsOperator.addEventListener("click", () => {
    data.calculateDisplay(data.displayString);
})