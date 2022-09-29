const previousExpression = document.querySelector('.previous-expression')
const currentExpression = document.querySelector('.current-expression')
const buttons = document.querySelectorAll('td')
const symbolArray = ['+', '-', '/', 'x', '=']
let tempNumber = ''

class Calculate{
    constructor(prevExp, currentExp){            
        this.prevExp = prevExp
        this.currentExp = currentExp
    }

    insertNumber(value){
        if(this.prevExp.innerText.includes('=')){
            this.currentExp.innerText = value
            this.prevExp.innerText = ''
            tempNumber = ''
        }else{
            if(this.currentExp.innerText === '0'){
                this.currentExp.innerText = ''
            }
            if(this.prevExp.innerText === '' && tempNumber === ''){
                this.currentExp.innerText += value    
            }else if(this.prevExp.innerText !== '' && tempNumber === ''){
                tempNumber = value
                this.currentExp.innerText = tempNumber
            }else if(this.prevExp.innerText !== '' && tempNumber !== ''){
                tempNumber += value
                this.currentExp.innerText = tempNumber
            }
        }
    }

    insertSymbol(symbol){
        if(tempNumber === ''){
            this.prevExp.innerText = this.currentExp.innerText + symbol
        }else{
            let result
            const prevExpLength = this.prevExp.innerText.length
            const prevSymbol = this.prevExp.innerText.substr(prevExpLength-1, prevExpLength)
            const prevExpNumbers = this.prevExp.innerText.substr(0, prevExpLength-1)
            
            switch(prevSymbol){
                case '+':
                    result = +prevExpNumbers + +this.currentExp.innerText
                    break;
                case '-':
                    result = +prevExpNumbers - +this.currentExp.innerText
                    break;
                case 'x':
                    result = +prevExpNumbers * +this.currentExp.innerText
                    break;
                case '/':
                    result = +prevExpNumbers / +this.currentExp.innerText
                    break;
                default:
                    return
                
            }
            if(symbol === '='){
                this.prevExp.innerText = `${this.prevExp.innerText}${this.currentExp.innerText}${symbol}`
                tempNumber = ''
            }else{
                this.prevExp.innerText = `${result}${symbol}`
                tempNumber = ''
            }
            this.currentExp.innerText = result
        }
        
    }

    resetCurrentExp(){
        this.currentExp.innerText = '0'
        tempNumber = ''
    }

    resetAll(){
        this.currentExp.innerText = '0'
        this.prevExp.innerText = ''
        tempNumber = ''
    }

    deleteLastDigit(){
        const currentExpLength = this.currentExp.innerText.length
        if(currentExpLength !== 1){
            if(tempNumber !== '' || this.prevExp.innerText === ''){
                this.currentExp.innerText = this.currentExp.innerText.substr(0, currentExpLength-1)
                tempNumber = this.currentExp.innerText.substr(0, currentExpLength-1)
            }else if(this.prevExp.innerText.includes('=')){
                this.prevExp.innerText = ''
                this.currentExp.innerText = '0'
            }
        }else{
            this.currentExp.innerText = '0'
            tempNumber = ''
        }
    }
}

const calc = new Calculate(previousExpression, currentExpression)

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const currentClick = e.target.innerText
        if(+currentClick >= 0 || currentClick === '.'){
            if(currentClick === '.' && currentExpression.innerText.includes('.')){
                return
            }else if(currentClick !== ''){
                calc.insertNumber(currentClick)
            }
        }else if(symbolArray.includes(currentClick)){
            calc.insertSymbol(currentClick)
        }

        switch(currentClick){
            case 'CE':
                calc.resetCurrentExp()
                break;
            case 'C':
                calc.resetAll()
                break;
            case '':
                calc.deleteLastDigit()
                break;
            default:
                return
        }
    })
})



