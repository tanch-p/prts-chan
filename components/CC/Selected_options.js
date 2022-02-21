export default function Selected_options({ selected}) {
  return (
    <>
      <div className="flex flex-wrap flex-col border-b border-b-gray-400 w-full h-[300px] max-w-[900px] text-[12px] lg:text-md bg-[#292929] text-gray-300">
        {selected.map((option) => (
          <p className="max-w-[400px]">{option.tooltip}</p>
        ))}
      </div>
      
    </>
  );
}
