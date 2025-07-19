const WrongCommand = ({ command }: { command: string }) => (
  <>
    <p>{`Command not found: "${command}"`}</p>
    <p>
      You can run the "help" command at any time to see a list of available
      commands.
    </p>
  </>
);

export default WrongCommand;
