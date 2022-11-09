import { useState, useEffect } from 'react';

import Scramble from '../components/Scramble';
import Scrambler from '../lib/scrambler';

const scrambler = new Scrambler('3x3');

const Home = () => {
  const [scramble, setScramble] = useState('');

  useEffect(() => {
    setScramble(scrambler.generate());
  }, [])

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-4"><Scramble scramble={scramble} /></div>
      <div className="border-2">Foo.</div>
      
    </div>
  );
};

export default Home;
