import { useState } from 'react';
import './index.css';
import { PlusSquare, X } from 'react-feather';
import axios from 'axios';

import Input from './components/Input';
import Select from './components/Select';

function App() {
	const [ingredients, setIngredient] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [recipeContent, setRecipeContent] = useState<string>('');
	const [mealFocus, setMealFocus] = useState<string>('');

	function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			const target = e.target as HTMLInputElement;
			setIngredient([...ingredients, target.value]);

			target.value = '';
		}
	}

	function removeIngredient(index: number) {
		setIngredient(ingredients.filter((_, i) => i != index));
	}

	function generateRecipe() {
		setRecipeContent('');
		setLoading(true);

		// complete axios request to process.env.MEALS_API/api/recipe and post an object with ingredients
		axios
			.post(process.env.VITE_MEALS_API + '/api/recipe', { ingredients, focus: mealFocus })
			.then((res) => {
				let { recipe } = res.data;
				recipe = recipe.trim();

				setRecipeContent(recipe);
				setLoading(false);
			})
			.catch((_) => {
				setRecipeContent('An error occured, please try again.');
				setLoading(false);
			});
	}

	return (
		<div className="flex items-center justify-center h-screen w-screen bg-gray-200">
			<div className="p-4 border drop-shadow-md bg-gray-100 rounded-md border-gray-200 gap-8 flex flex-row h-1/2 lg:h-2/3 w-3/4">
				<div
					id="ingredients"
					className="w-1/3 flex flex-col font-medium text-xl text-gray-800"
				>
					Ingredients
					<div className="text-black font-normal h-full flex justify-between flex-col mt-4">
						<div
							id="ingredientList"
							className="flex flex-col gap-2 overflow-y-auto text-sm lg:text-base"
						>
							{ingredients.length > 0 ? (
								ingredients.map((ingredient, i) => (
									<div
										key={`ingredient-${i}`}
										className="stroke-gray-700 rounded border-2 p-1.5 justify-between text-gray-700 flex flex-row items-center gap-2"
									>
										{ingredient}
										<X
											className="cursor-pointer text-red-500 hover:text-red-700 transition delay-25 duration-250 ease-in-out"
											size={14}
											onClick={() => removeIngredient(i)}
										/>
									</div>
								))
							) : (
								<div key="placeholder" className="text-xs text-gray-500">
									You don't have any ingredients, add one to get started!
								</div>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex flex-row gap-2 items-center justify-top">
								<Select
									id="focus"
									type="select"
									placeholder={'Select a food type...'}
									onChange={() => {
										const input = document.querySelector(
											'#focus'
										) as HTMLSelectElement;
										const focus = input.value;

										setMealFocus(focus);
									}}
								>
									<option value="">Any</option>
									<option value="sandwich">Sandwich</option>
									<option value="soup">Soup</option>
									<option value="salad">Salad</option>
									<option value="pasta">Pasta</option>
									<option value="main course">Main Course</option>
									<option value="side dish">Side Dish</option>
									<option value="dessert">Dessert</option>
									<option value="appetizer">Appetizer</option>
									<option value="breakfast">Breakfast</option>
								</Select>
							</div>
							<div className="flex flex-row gap-2 items-center">
								<Input
									id="ingredientInput"
									placeholder="Enter any ingredient..."
									onKeyDown={handleEnter}
								/>
								<PlusSquare
									id="addIngredient"
									className="cursor-pointer stroke-gray-700"
									onClick={() => {
										// get ingredient from input
										const input = document.querySelector(
											'input'
										) as HTMLInputElement;
										const ingredient = input.value;

										setIngredient([...ingredients, ingredient]);

										input.value = '';
									}}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="w-0.5 bg-gray-200"></div>
				<div className="w-2/3 flex flex-col font-medium text-xl">
					Generate a recipe:
					<textarea
						value={recipeContent}
						className="my-4 h-full resize-none text-sm font-normal p-3 focus:outline-none bg-gray-200"
						disabled
					/>
					<div>
						<button
							disabled={loading}
							onClick={generateRecipe}
							className={`${
								!loading ? 'hover:bg-blue-600' : ''
							} border border-gray-200 text-white w-full rounded-md h-10 bg-blue-400 text-sm focus:outline-none font-normal transition delay-25 duration-250 ease-in-out p-1 px-2`}
						>
							{!loading ? 'Generate' : 'Generating...'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
