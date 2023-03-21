// jest tests for App component
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from '../src/App';

test('Renders main page correctly', () => {
	render(<App />);

	// check for #ingredients
	const ingredients = document.querySelector('#ingredients');
	expect(ingredients).toBeDefined();
});

// Test #ingredientInput to see if it exists
test('Renders ingredient input correctly', () => {
	render(<App />);

	const ingredientInput = document.querySelector('#ingredientInput');
	expect(ingredientInput).toBeDefined();
});

// Test #ingredientInput to see if it can be typed in properly
test('Ingredient input can be typed in', () => {
	render(<App />);

	const ingredientInput = document.querySelector('#ingredientInput') as HTMLInputElement;
	expect(ingredientInput).toBeDefined();

	ingredientInput.value = 'test';
	expect(ingredientInput.value).toBe('test');
});

// Test #addIngredient to see if it exists
test('Renders add ingredient button correctly', () => {
	render(<App />);

	const addIngredient = document.querySelector('#addIngredient');
	expect(addIngredient).toBeDefined();
});

// Test #ingredientList to see if it exists
test('Renders ingredient list correctly', () => {
	render(<App />);

	const ingredientList = document.querySelector('#ingredientList');
	expect(ingredientList).toBeDefined();
});

// Test to see if ingredients are added to the list.
test('Ingredients are added to the list', () => {
	render(<App />);

	const ingredientInput = document.querySelector('#ingredientInput') as HTMLInputElement;
	expect(ingredientInput).toBeDefined();

	const addIngredient = document.querySelector('#addIngredient');
	expect(addIngredient).toBeDefined();

	ingredientInput.value = 'test';
	expect(ingredientInput.value).toBe('test');

	fireEvent.click(addIngredient as HTMLElement);

	const ingredientList = document.querySelector('#ingredientList');
	expect(ingredientList).toBeDefined();

	expect(ingredientList?.children?.length).toBe(1);
	expect(ingredientList?.children[0].textContent).toBe('test');
});

// Test to see if ingredients are removed from the list.
test('Ingredients are removed from the list', () => {
	render(<App />);

	const ingredientInput = document.querySelector('#ingredientInput') as HTMLInputElement;
	expect(ingredientInput).toBeDefined();

	const addIngredient = document.querySelector('#addIngredient');
	expect(addIngredient).toBeDefined();

	ingredientInput.value = 'test';
	expect(ingredientInput.value).toBe('test');

	fireEvent.click(addIngredient as HTMLElement);

	const ingredientList = document.querySelector('#ingredientList');
	expect(ingredientList).toBeDefined();

	expect(ingredientList?.children?.length).toBe(1);
	expect(ingredientList?.children[0].textContent).toBe('test');
	expect(ingredientList?.children[0].children?.length).toBe(1);

	// removeIngredient is the child of the first child of ingredientList
	const removeIngredient = ingredientList?.children[0].children[0];
	expect(removeIngredient).toBeDefined();

	fireEvent.click(removeIngredient as HTMLElement);

	expect(ingredientList?.children?.length).toBe(1); // still 1 because of placeheolder
	expect(ingredientList?.children[0].textContent).not.toBe('test');
});
