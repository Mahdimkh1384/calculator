import { defineStore } from "pinia";

export const useCalculatorStore = defineStore('calculator', {
    state: () => ({
        value: "0",
        firstValue: "0",
        action: ""
    }),

    actions: {
        setValue(data) {
            if (data.type === 'number') {
                this.value = this.value === "0"
                    ? `${data.value}`
                    : `${this.value}${data.value}`
            } else if (data.type === 'operator') {
                this.firstValue = this.value
                this.value = "0"
                if (data.value === "+") {
                    this.action = "+"
                } else if (data.value === "-") {
                    this.action = "-"
                } else if (data.value === "*") {
                    this.action = "*"
                } else {
                    this.action = "/"
                }
            } else if (data.type === 'action' && data.value === 'C') {
                this.value = "0"
            } else if (data.type === 'action' && data.value === 'backspace') {
                if (this.value.length === 1) {
                    this.value = "0"
                } else {
                    this.value = this.value.slice(0, -1)
                }
            } else if (data.type === 'action' && data.value === '=') {
                const a = Number(this.firstValue)
                const b = Number(this.value)

                let result = 0

                switch (this.action) {
                    case "+": result = a + b; break
                    case "-": result = a - b; break
                    case "*": result = a * b; break
                    case "/": result = b !== 0 ? a / b : "Error"; break
                }

                this.value = String(result)
                this.firstValue = "0"
                this.action = ""
            }
        }
    }
})