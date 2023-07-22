export function Button({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={
        className
          ? className
          : 'text-white disabled:bg-slate-500 bg-slate-500 disabled:bg-opacity-75 enabled:hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 sm:mr-2 lg:mr-0 focus:outline-none'
      }
    >
      {children}
    </button>
  );
}
