import { feedSlice, getOrderByNumber, getFeeds, initialState } from './feedSlice';
import { TOrder, TOrdersData } from '@utils-types';

describe('feedSlice', () => {
    it('getFeeds.pending', () => {
        const action = { type: getFeeds.pending.type };
        const state = feedSlice.reducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('getFeeds.fulfilled', () => {
        const testOrders: TOrdersData = {
            orders: [
                {
                    _id: '1',
                    ingredients: ['1', '2', '3'],
                    status: 'done',
                    name: 'test',
                    createdAt: 'test',
                    updatedAt: 'test',
                    number: 1
                }
            ],
            total: 1,
            totalToday: 1
        };

        const action = {
            type: getFeeds.fulfilled.type,
            payload: testOrders
        };
        const state = feedSlice.reducer(initialState, action);
        expect(state.orders).toEqual(testOrders.orders);
        expect(state.total).toEqual(testOrders.total);
        expect(state.totalToday).toEqual(testOrders.totalToday);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    it('getFeeds.rejected', () => {
        const action = {
            type: getFeeds.rejected.type,
            error: { message: 'error' }
        };
        const state = feedSlice.reducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe('error');
    });

    it('getOrderByNumber.pending', () => {
        const action = { type: getOrderByNumber.pending.type };
        const state = feedSlice.reducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('getOrderByNumber.fulfilled', () => {
        const testOrder: TOrder = {
            _id: '1',
            ingredients: ['1', '2', '3'],
            status: 'done',
            name: 'test',
            createdAt: 'test',
            updatedAt: 'test',
            number: 1
        };

        const action = {
            type: getOrderByNumber.fulfilled.type,
            payload: { orders: [testOrder] }
        };

        const state = feedSlice.reducer(initialState, action);
        expect(state.order).toEqual(testOrder);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    it('getOrderByNumber.rejected', () => {
        const action = {
            type: getOrderByNumber.rejected.type,
            error: { message: 'error' }
        };
        const state = feedSlice.reducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe('error');
    });
});