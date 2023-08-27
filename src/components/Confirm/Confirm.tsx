import { Button } from "@nextui-org/react";

interface OkOptions {
  penalty: number;
}

interface ConfirmProps {
  active: boolean;
  ok: (arg0?: OkOptions) => Promise<void>;
  toggle: () => void;
}

const Confirm = (props: ConfirmProps) => {
  const { active, ok, toggle } = props;

  if (!active) return <></>;

  return (
    <div
      className={`fixed left-200 inset-28 top-30 z-50 overflow-auto bg-smoke-light flex ${
        active ? "" : "hidden"
      }`}
    >
      <div className="relative p-8 bg-gray-50 max-w-md m-auto border-2 border-zinc-900 flex-col flex rounded-lg">
        <p className="pb-6">Would you like to save this time?</p>
        <div className="flex gap-x-4">
          <Button color="success" onClick={() => ok()}>
            Confirm
          </Button>
          <Button
            color="warning"
            onClick={() => {
              ok({ penalty: 2000 });
            }}
          >
            +2
          </Button>
          <Button color="danger" onClick={toggle}>
            Reject
          </Button>
        </div>
        <span className="absolute top-0 right-0 p-4"></span>
      </div>
    </div>
  );
};

export default Confirm;
