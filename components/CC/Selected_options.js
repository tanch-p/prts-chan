export default function Selected_options({ selected}) {
  return (
    <>
      <div className="flex flex-wrap flex-col border border-gray-800 w-full h-[300px] max-w-[900px]">
        {selected.map((option) => (
          <p className="max-w-[400px]">{option.tooltip}</p>
        ))}
      </div>
      
    </>
  );
}
