declare const template: {
    <P = {}>(fn: (props: P) => HTMLElement): (props: P) => HTMLElement;
    isProxy(x: unknown): boolean;
};
export default template;
