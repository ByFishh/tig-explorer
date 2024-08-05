import { MouseEventHandler, useCallback, useState } from 'react';
import copy from 'copy-to-clipboard';
import { IAddress } from '@/types/IAddress/IAddress';

export const useAddress = (props: IAddress) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleView = () => setToggle(!toggle);

  const onCopy = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      copy(props.address);
    },
    [],
  );

  return { toggle, toggleView, onCopy };
};
