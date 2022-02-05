import { ViewElement } from '~/types';
declare abstract class Component<P = {}> {
    abstract render(props: P): ViewElement;
}
export default Component;
