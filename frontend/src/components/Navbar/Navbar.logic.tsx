import { useState } from 'react';

export const useNavbar = () => {
  const [tigValue, setTigValue] = useState<number>(0);

  return { tigValue };
};
