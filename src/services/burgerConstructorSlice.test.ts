import {
    burgerConstructorSlice,
    addIngredient,
    deleteIngredient,
    moveUp,
    moveDown,
    removeConstructor,
    initialState,
    TburgerConstructorSlice
} from './burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('orderSlice', () => {
    const testIngredientMain: TIngredient = {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    const testConstructorIngredientSauce: TConstructorIngredient = {
        id: '643d69a5c3f7b9001cfa0942',
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };

    const testConstructorIngredient: TConstructorIngredient = {
        ...testIngredientMain,
        id: ''
    };

    it('addIngredients', () => {
        const newState = burgerConstructorSlice.reducer(
            initialState,
            addIngredient(testIngredientMain)
        );

        testConstructorIngredient.id = newState.ingredients[0].id;

        expect(newState.ingredients).toEqual([testConstructorIngredient]);
    });

    it('deleteIngredient', () => {
        const initialStateTest: TburgerConstructorSlice = {
            ...initialState,
            ingredients: [testConstructorIngredientSauce]
        };
        console.log(initialStateTest);
        const action = deleteIngredient(testConstructorIngredientSauce);
        const state = burgerConstructorSlice.reducer(initialStateTest, action);
        console.log(state);

        expect(state.ingredients).toEqual([]);
    });

    it('moveIngredient', () => {
        const initialStateTest: TburgerConstructorSlice = {
            ...initialState,
            ingredients: [testConstructorIngredient, testConstructorIngredientSauce]
        };

        const action = moveUp(1);
        const state = burgerConstructorSlice.reducer(initialStateTest, action);
        expect(state.ingredients).toEqual([
            testConstructorIngredientSauce,
            testConstructorIngredient
        ]);

        const action2 = moveDown(0);
        const state2 = burgerConstructorSlice.reducer(state, action2);
        expect(state2.ingredients).toEqual([
            testConstructorIngredient,
            testConstructorIngredientSauce
        ]);
    });

    it('removeConstructor', () => {
        const initialStateTest: TburgerConstructorSlice = {
            ingredients: [testConstructorIngredient, testConstructorIngredientSauce],
            bun: {
                _id: '643d69a5c3f7b9001cfa093c',
                id: '643d69a5c3f7b9001cfa093c',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
            },
        };

        const action = removeConstructor();
        const state = burgerConstructorSlice.reducer(initialStateTest, action);
        expect(state).toEqual(initialState);
    });

});