const WrongCommand = ({ command }: { command: string }) => (
  <>
    <p>{`Command not found: "${command}"`}</p>
    <p>
      You can run the &qout;help&qout; command at any time to see a list of
      available commands.
    </p>
  </>
);

export default WrongCommand;
