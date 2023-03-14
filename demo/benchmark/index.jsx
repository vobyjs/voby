/* IMPORT */
import { createElement, Fragment } from 'voby';
import { $, render, resolve, template, useRoot, useSelector, For } from 'voby';
/* HELPERS */
const rand = (max) => {
    return Math.round(Math.random() * 1000) % max;
};
const buildData = (() => {
    const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
    const colors = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
    const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];
    let uuid = 1;
    return (length) => {
        const data = new Array(length);
        for (let i = 0; i < length; i++) {
            const id = uuid++;
            const adjective = adjectives[rand(adjectives.length)];
            const color = colors[rand(colors.length)];
            const noun = nouns[rand(nouns.length)];
            const label = $(`${adjective} ${color} ${noun}`);
            const datum = { id, label };
            data[i] = datum;
        }
        ;
        return data;
    };
})();
/* MODEL */
const Model = new class {
    // page: Observable<Observable<IDatum[]>>;
    /* CONSTRUCTOR */
    constructor() {
        /* API */
        this.init = () => {
            this.selected = $(-1);
            this.data = $([]);
            // this.page = $( this.data );
        };
        // reset = (): void => {
        //   this.selected = $( -1 );
        //   this.data = $<IDatum[]>( [] );
        //   this.page ( () => this.data );
        // };
        this.run0 = () => {
            this.runWith(0);
        };
        this.run1000 = () => {
            this.runWith(1000);
        };
        this.run10000 = () => {
            this.runWith(10000);
        };
        this.runWith = (length) => {
            // this.reset ();
            this.data(buildData(length));
        };
        this.add = () => {
            this.data(data => [...data, ...buildData(1000)]);
        };
        this.update = () => {
            const data = this.data();
            for (let i = 0, l = data.length; i < l; i += 10) {
                data[i].label(label => label + ' !!!');
            }
        };
        this.swapRows = () => {
            const data = this.data().slice();
            if (data.length <= 998)
                return;
            const datum1 = data[1];
            const datum998 = data[998];
            data[1] = datum998;
            data[998] = datum1;
            this.data(data);
        };
        this.remove = (id) => {
            this.data(data => {
                const idx = data.findIndex(datum => datum.id === id);
                return [...data.slice(0, idx), ...data.slice(idx + 1)];
            });
        };
        this.select = (id) => {
            this.selected(id);
        };
        this.init();
    }
};
/* COMPONENTS */
const Button = ({ id, text, onClick }) => (<div class="col-sm-6 smallpad">
        <button id={id} class="btn btn-primary btn-block" type="button" onClick={onClick}>
            {text}
        </button>
    </div>);
const Row = template(({ id, label, className, onSelect, onRemove }) => (<tr class={className}>
        <td class="col-md-1">
            {id}
        </td>
        <td class="col-md-4">
            <a onClick={onSelect}>
                {label}
            </a>
        </td>
        <td class="col-md-1">
            <a onClick={onRemove}>
                <span class="glyphicon glyphicon-remove" ariaHidden={true}/>
            </a>
        </td>
        <td class="col-md-6"/>
    </tr>));
const Rows = ({ data, isSelected }) => (<For values={data}>
        {(datum) => {
        const { id, label } = datum;
        const selected = isSelected(id);
        const className = { danger: selected };
        const onSelect = Model.select.bind(undefined, id);
        const onRemove = Model.remove.bind(undefined, id);
        const props = { id, label, className, onSelect, onRemove };
        return Row(props);
    }}
    </For>);
// const RowsWithOptimizedCleanup = ({ page }: { page: () => FunctionMaybe<IDatum[]> }): JSX.Element => {
//   return (): JSX.Element => {
//     const data = page ();
//     const isSelected = useSelector ( Model.selected );
//     return useRoot ( () => resolve ( <Rows data={data} isSelected={isSelected} /> ) );
//   }
// };
const App = () => (<div class="container">
        <div class="jumbotron">
            <div class="row">
                <div class="col-md-6">
                    <h1>Voby</h1>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <Button id="run" text="Create 1,000 rows" onClick={Model.run1000}/>
                        <Button id="runlots" text="Create 10,000 rows" onClick={Model.run10000}/>
                        <Button id="add" text="Append 1,000 rows" onClick={Model.add}/>
                        <Button id="update" text="Update every 10th row" onClick={Model.update}/>
                        <Button id="clear" text="Clear" onClick={Model.run0}/>
                        <Button id="swaprows" text="Swap Rows" onClick={Model.swapRows}/>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-hover table-striped test-data">
            <tbody>
                <Rows data={Model.data} isSelected={useSelector(Model.selected)}/>
                {/* <Rows data={() => Model.page ()()} isSelected={useSelector ( Model.selected )} /> */}
                {/* <RowsWithOptimizedCleanup page={Model.page} /> */}
            </tbody>
        </table>
        <span class="preloadicon glyphicon glyphicon-remove" ariaHidden={true}/>
    </div>);
/* RENDER */
render(<App />, document.getElementById('app'));
