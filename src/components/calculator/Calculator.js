import React, {useRef, useEffect, useState} from 'react';

import './calculator.css';

import {btns, BTN_ACTIONS} from './btnConfig'

const Calculator = () => {
    const btnsRef = useRef()
    const expRef = useRef()

    const [expression, setExpression] = useState('')

    useEffect(() =>{
        const btns = Array.from(btnsRef.current.querySelectorAll('button'))

        btns.forEach((e) => e.style.height = e.offsetWidth + 'px')
    }, [])

    const btnClick = (btn) => {
        // console.log(btn)

        const expDiv = expRef.current;

        if(btn.action === BTN_ACTIONS.THEME) {
            document.body.classList.toggle('dark')
        }

        if(btn.action === BTN_ACTIONS.ADD) {
            addAnimSpan(btn.display)

            const oper = btn.display !== 'x' ? btn.display : '*'
            setExpression(expression + oper)
        }

        if(btn.action === BTN_ACTIONS.DELETE) {
            expDiv.parentNode.querySelector('div:last-child').innerHTML= ''
            expDiv.innerHTML = ''

            setExpression('')
        }

        if(btn.action === BTN_ACTIONS.CALC) {
            if(expression.trim().length <= 0) return

            expDiv.parentNode.querySelector('div:last-child').remove()

            const cloneNode = expDiv.cloneNode(true)
            expDiv.parentNode.appendChild(cloneNode)

            const transform = `translateY(${-(expDiv.offsetHeight + 10) + 'px'}) scale(0.5)`

            console.log(expDiv.offsetHeight)

            try {
                let res = eval(expression)
                setExpression(res.toString())
                setTimeout(() => {
                    cloneNode.style.transform = transform
                    expDiv.innerHTML = ''
                    addAnimSpan(Math.floor(res * 100000000) / 100000000)
                }, 200)
            }catch {
                setTimeout(() => {
                    cloneNode.style.transform = transform
                    expDiv.innerHTML = 'Syntax error'
                }, 200)
            }finally {
                console.log('calc complete!')
            }
        }
    }

    const addAnimSpan = (content) => {
        const expDiv = expRef.current;
        const span = document.createElement('span')

        span.innerHTML = content
        span.style.opacity = '0'
        expDiv.appendChild(span)

        const width = span.offsetWidth + 'px'
        span.style.width = '0'

        setTimeout(() => {
            span.style.opacity = '1'
            span.style.width = width
        }, 100)
    }

    return (
        <div className="calculator">
            <div className="calculator__result">
                <div ref={expRef} className="calculator__result__exp"></div>
                <div className="calculator__result__exp"></div>
            </div>
            <div ref={btnsRef} className="calculator__btns">
                {btns.map((btn, index) => (
                    <button 
                        key={index} 
                        className={btn.class}
                        onClick={() => btnClick(btn)}
                    >
                        {btn.display}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Calculator