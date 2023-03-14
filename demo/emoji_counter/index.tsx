
/* IMPORT */

import { $, render } from 'voby'
import type { JSX, Observable } from 'voby'

/* HELPERS */

const EMOJIS = ['👌', '☝️', '✌️', '🤘', '🖖', '🖐️']
const PLUS = '➕'
const MINUS = '➖'

/* MAIN */

const Button = ({ onClick, children }: { onClick: () => void, children?: JSX.Children }): JSX.Element => {

    return <button style={{ width: '40px', height: '40px', fontSize: '25px', borderRadius: '12px', cursor: 'pointer', backgroundColor: '#3f3f3f', color: '#f9f9f9', borderWidth: '0' }} onClick={onClick}>{children}</button>

}

const Container = ({ children }: { children?: JSX.Children }): JSX.Element => {

    return (
        <div style={{ backgroundColor: '#FFF5DB', position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {children}
        </div>
    )

}

const HStack = ({ children }: { children?: JSX.Children }): JSX.Element => {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px' }}>
            {children}
        </div>
    )

}

const VStack = ({ children }: { children?: JSX.Children }): JSX.Element => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
            {children}
        </div>
    )

}

const Emojis = ({ value }: { value: Observable<number> }): JSX.Element => {

    const value2sign = (value: number) => Math.sign(value) < 0 ? MINUS : ''
    const value2chunks = (value: number) => (value <= 5) ? [value] : [...value2chunks(value - 5), 5]
    const chunk2emoji = (chunk: number) => EMOJIS[chunk]

    const sign = () => value2sign(value())
    const emojis = () => value2chunks(Math.abs(value())).map(chunk2emoji).join('')

    return (
        <div style={{ fontSize: '100px', textAlign: 'center' }}>
            {sign}{emojis}
        </div>
    )

}

const EmojiCounter = (): JSX.Element => {

    const value = $(2)

    const increment = () => value(prev => prev + 1)
    const decrement = () => value(prev => prev - 1)

    return (
        <Container>
            <VStack>
                <Emojis value={value} />
                <HStack>
                    <Button onClick={increment}>+</Button>
                    <Button onClick={decrement}>-</Button>
                </HStack>
            </VStack>
        </Container>
    )

}

render(<EmojiCounter />, document.getElementById('app'))
