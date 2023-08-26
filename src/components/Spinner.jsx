const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
    </div>
  );
};

export default Spinner;
