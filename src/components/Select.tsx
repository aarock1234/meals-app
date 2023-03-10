const Select = (props: React.HTMLProps<HTMLSelectElement>) => {
	return (
		<select
			{...props}
			className={
				'rounded-md border border-gray-200 h-10 w-full focus:outline-none focus:border-blue-400 transition delay-50 ease-in-out p-1 px-2 text-sm ' +
				props.className
			}
		/>
	);
};

export default Select;
