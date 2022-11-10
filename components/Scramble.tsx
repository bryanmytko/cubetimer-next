interface ScrambleProps {
  scramble: string;
}

const Scramble = (props: ScrambleProps) => (
  <p className="text-white text-2xl text-center">{props.scramble}</p>
);

export default Scramble;
