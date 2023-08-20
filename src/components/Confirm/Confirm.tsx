interface ConfirmProps {
  active: boolean;
  callback: () => Promise<void>;
}

const Confirm = (props: ConfirmProps) => {
  const { active, callback } = props;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto bg-smoke-light flex ${
        active ? "" : "hidden"
      }`}
    >
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <button onClick={callback}>Confirm?</button>
        <span className="absolute top-0 right-0 p-4"></span>
      </div>
    </div>
  );
};

export default Confirm;
