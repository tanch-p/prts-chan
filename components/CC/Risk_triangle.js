export default function Risk_triangle({ risk ,type }) {
  const getTriangle = () => {
    switch (risk) {
      case 1:
        return (
          <div
            className={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-b-[12px] border-b-gray-500 z-50 `}
          ></div>
        );
      case 2:
        return (
          <>
            <div
              className={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-b-[12px] border-b-gray-800 z-50 translate-x-0.5`}
            ></div>
            <div
              className={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-t-[12px] border-t-gray-800 z-50 -translate-x-0.5`}
            ></div>
          </>
        );
      case 3:
        return (
          <>
            <div
              className={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-b-[12px] border-b-red-600 z-50 translate-x-1`}
            ></div>
            <div
              className={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-t-[12px] border-t-red-600 z-50 `}
            ></div>
            <div
              className={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-b-[12px] border-b-red-600 z-50 -translate-x-1`}
            ></div>
          </>
        );
      default:
        break;
    }
  };

  return (
    <div className={`flex flex-wrap flex-row bg-white place-content-center py-1   ${type === "daily" ? "rounded-r h-full min-w-[45px]" : "rounded h-[20px] w-[50px]"}`}>
      {getTriangle()}
    </div>
  );
}
