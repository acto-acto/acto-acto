export default function ShellInput({ command }: { command?: string }) {
  return (
    <div className="flex items-center">
      <span className="flex items-center justify-center mr-2">
        <span className="w-[5px] h-[5px] rounded-full bg-[#00A154]"></span>
      </span>
      {command ? (
        <p className="mr-2"> {`acto@actotech.dev:~$ ${command}`}</p>
      ) : (
        <p className="mr-2">acto@actotech.dev:~$</p>
      )}
    </div>
  );
}
