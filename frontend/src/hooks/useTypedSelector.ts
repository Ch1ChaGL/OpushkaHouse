import { TypeRootSate } from '../store/inedx';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<TypeRootSate> = useSelector;
