import { rootReducer } from './store';
import { orderSlice } from './orderSlice';
import { userSlice } from './userSlice';
import { feedSlice } from './feedSlice';
import { productSlice } from './productSlice';
import { burgerConstructorSlice } from './burgerConstructorSlice';

describe('rootReducer', () => {
    it('stores all slices', () => {
        const state = rootReducer(undefined, { type: '@@INIT' });
        expect(state).toHaveProperty(orderSlice.name);
        expect(state).toHaveProperty(userSlice.name);
        expect(state).toHaveProperty(feedSlice.name);
        expect(state).toHaveProperty(productSlice.name);
        expect(state).toHaveProperty(burgerConstructorSlice.name);
    });
});