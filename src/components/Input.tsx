type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg: string;
};

export function Input({ onChange, errorMsg }: InputProps) {
  return (
    <div className="ml-6 mr-8 w-full">
      <input className="text-lg border-b-2 w-full border-black outline-0" placeholder="inherit" onChange={onChange} />
      {errorMsg && <div className="text-sm text-red-500">{errorMsg}</div>}
    </div>
  );
}
