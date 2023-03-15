const Tutorials = () => {
  return (
    <div className="bg-gray-200 m-auto p-12 mt-12 w-11/12 rounded text-black">
      <h1 className="text-3xl font-bold m-auto mb-6">Tutorials</h1>
      <ul>
        <li>
          <a className="text-cyan-800" href="http://badmephisto.com">
            Bad Mephisto
          </a>
        </li>
        <li>
          <a className="text-cyan-800" href="https://jperm.net">
            JPerm
          </a>
        </li>
        <li>
          <a
            className="text-cyan-800"
            href="http://cubefreak.net/speed/articles/howtolearn.php"
          >
            Cubefreak
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tutorials;
