import { TNewOrderResponse } from '../utils/burger-api';
import { orderSlice, deleteOrder, initialState, IOrderState, newOrder } from './orderSlice';

it('newOrder.pending', () => {
    const action = {
        type: newOrder.pending.type,
        payload: ['test1', 'test2']
    };

    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
});

it('deleteOrder', () => {
    const newState = orderSlice.reducer(
        initialState,
        deleteOrder()
    );
    expect(newState.order).toEqual(null);
    expect(newState.loading).toEqual(false);
});

it('newOrder.fulfilled', () => {
    const testOrder = {
        _id: '643d69a5c3f7b9001cfa093c',
        status: 'done',
        name: 'testOrder',
        createdAt: '22.09.2024',
        updatedAt: '22.09.2024',
        number: 1234567890,
        ingredients: ['id1', 'id2']
    };

    const testResponse: TNewOrderResponse = {
        success: true,
        name: 'testOrder',
        order: testOrder
    };

    const expectedState: IOrderState = {
        ...initialState,
        loading: false,
        order: testOrder
    };

    const action = {
        type: newOrder.fulfilled.type,
        payload: testResponse
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual(expectedState);
});

it('newOrder.rejected', () => {
    const action = {
        type: newOrder.rejected.type,
        error: { message: 'error' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
});
