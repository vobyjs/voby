
/* IMPORT */

import { render, store, ForIndex, Switch, Ternary } from 'voby'
import type { JSX } from 'voby'

/* TYPES */

type AnimItem = {
    id: number,
    time: number
}

type AnimState = {
    items: AnimItem[]
}

type TableItem = {
    id: number,
    active: boolean,
    props: string[]
}

type TableState = {
    items: TableItem[]
}

type TreeItem = {
    id: number,
    container: boolean,
    children: TreeItem[]
}

type TreeState = {
    root: TreeItem
}

type State = {
    location: 'anim' | 'table' | 'tree' | 'unknown',
    anim: AnimState,
    table: TableState,
    tree: TreeState
}

type Results = Record<string, number[]>

/* STATE */

const state = store<State>({
    location: 'unknown',
    anim: {
        items: []
    },
    table: {
        items: []
    },
    tree: {
        root: {
            id: 0,
            container: true,
            children: []
        }
    }
})

/* MAIN */

const Anim = ({ state }: { state: AnimState }): JSX.Element => {

    return (
        <div class="Anim">
            <ForIndex values={state.items}>
                {item => {
                    const id = () => item().id
                    const borderRadius = () => item().time % 10
                    const background = () => `rgba(0,0,0,${0.5 + ((item().time % 10) / 10)})`
                    return <div class="AnimBox" data-id={id} style={{ borderRadius, background }} />
                }}
            </ForIndex>
        </div>
    )

}

const Table = ({ state }: { state: TableState }): JSX.Element => {

    const onClick = (event: MouseEvent): void => {
        console.log('Clicked' + (event.target as any)?.textContent)
        event.stopPropagation()
    }

    return (
        <table class="Table">
            <tbody>
                <ForIndex values={state.items}>
                    {item => {
                        const id = () => item().id
                        const className = () => item().active ? 'TableRow active' : 'TableRow'
                        const content = () => `#${item().id}`
                        return (
                            <tr class={className} data-id={id}>
                                <td class="TableCell">
                                    {content}
                                </td>
                                <ForIndex values={() => item().props}>
                                    {text => (
                                        <td class="TableCell" onClick={onClick}>
                                            {text}
                                        </td>
                                    )}
                                </ForIndex>
                            </tr>
                        )
                    }}
                </ForIndex>
            </tbody>
        </table>
    )

}

const TreeNode = ({ item }: { item: () => TreeItem }): JSX.Element => {

    return (
        <ul class="TreeNode">
            <ForIndex values={() => item().children}>
                {item => (
                    <Ternary when={() => item().container}>
                        <TreeNode item={item} />
                        <TreeLeaf item={item} />
                    </Ternary>
                )}
            </ForIndex>
        </ul>
    )

}

const TreeLeaf = ({ item }: { item: () => TreeItem }): JSX.Element => {

    return (
        <li class="TreeLeaf">
            {() => item().id}
        </li>
    )

}

const Tree = ({ state }: { state: TreeState }): JSX.Element => {

    return (
        <div class="Tree">
            <TreeNode item={() => state.root} />
        </div>
    )

}

const App = ({ state }: { state: State }): JSX.Element => {

    return (
        <div class="Main">
            <Switch when={() => state.location}>
                <Switch.Case when="anim">
                    <Anim state={state.anim} />
                </Switch.Case>
                <Switch.Case when="table">
                    <Table state={state.table} />
                </Switch.Case>
                <Switch.Case when="tree">
                    <Tree state={state.tree} />
                </Switch.Case>
            </Switch>
        </div>
    )

}

const Results = ({ results }: { results: Results }): JSX.Element => {

    const elapsed = Object.values(results).flat().reduce((acc, elapsed) => acc + elapsed, 0)

    console.log(elapsed)

    return (
        <pre>
            {JSON.stringify(results, undefined, 2)}
        </pre>
    )

}

/* INIT */

render(<App state={state} />, document.body)

/* UI BENCH */

const normalize = value => ({ // Removing major custom classes, which won't be reconciled properly
    location: value.location,
    anim: {
        items: value.anim.items
    },
    table: {
        items: value.table.items
    },
    tree: {
        root: value.tree.root
    }
})

const onUpdate = stateNext => store.reconcile(state, normalize(stateNext))
const onFinish = results => render(<Results results={results} />, document.body)

globalThis.uibench.init('Voby', '*')
globalThis.uibench.run(onUpdate, onFinish)
