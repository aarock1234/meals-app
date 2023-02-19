import { useState } from 'react';
import './index.css';
import { Divide, Plus, PlusCircle, PlusSquare, Send, X } from 'react-feather';
import Input from './components/Input';

function App() {
	const [ingredients, setIngredient] = useState<string[]>([]);

	function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			const target = e.target as HTMLInputElement;
			setIngredient([...ingredients, target.value]);

			target.value = '';
		}
	}

	function removeIngredient(ingredient: string) {
		setIngredient(ingredients.filter((i) => i !== ingredient));
	}

	return (
		<div className="flex items-center justify-center h-screen w-screen bg-gray-200">
			<div className="p-4 border drop-shadow-md bg-gray-100 rounded-md border-gray-200 gap-8 flex flex-row h-1/2 lg:h-2/3 w-3/4">
				<div className="w-1/3 flex flex-col font-medium text-xl text-gray-800">
					Ingredients
					<div className="text-black font-normal h-full flex justify-between flex-col mt-4">
						<div className="flex flex-col gap-2 overflow-y-auto text-sm lg:text-base">
							{ingredients.length > 0 ? (
								ingredients.map((ingredient, _) => (
									<div className="stroke-gray-700 rounded border-2 p-1.5 justify-between text-gray-700 flex flex-row items-center gap-2">
										{ingredient}
										<X
											className="cursor-pointer text-red-500 hover:text-red-700 transition delay-25 duration-250 ease-in-out"
											size={14}
											onClick={() => removeIngredient(ingredient)}
										/>
									</div>
								))
							) : (
								<div className="text-xs text-gray-500">
									You don't have any ingredients, add one to get started!
								</div>
							)}
						</div>
						<div className="flex flex-row gap-2 items-center">
							<Input placeholder="Enter any ingredient..." onKeyDown={handleEnter} />
							<PlusSquare
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
				<div className="w-0.5 bg-gray-200"></div>
				<div className="w-2/3 flex flex-col font-medium text-xl">
					Generate a recepie:
					<textarea
						className="my-4 h-full resize-none text-sm font-normal p-3 focus:outline-none bg-gray-200"
						disabled
					/>
					<div>
						<button className="border border-gray-200 text-white w-full rounded-md h-10 bg-blue-400 text-sm focus:outline-none font-normal hover:bg-blue-600 transition delay-25 duration-250 ease-in-out p-1 px-2">
							Generate
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
