import { ObservableMaybe, ViewElement } from '~/types';
declare const If: ({ when, children }: {
    when: ObservableMaybe<boolean>;
    children: ViewElement;
}) => ViewElement;
export default If;
