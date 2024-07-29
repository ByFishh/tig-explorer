import { IUnit } from '@/types/IUnit/IUnit';
import { Text } from '@radix-ui/themes';

export const useCard = () => {
  const getValue = (value: number, unit: IUnit): JSX.Element => {
    const formatedValue = value.toFixed(2);
    const map: Record<IUnit, JSX.Element> = {
      [IUnit.DOLLARD]: (
        <Text as="p" size="7" weight="medium">
          <span style={{ fontSize: '.825rem' }}>$</span>
          {formatedValue}
        </Text>
      ),
      [IUnit.TIG]: (
        <Text as="p" size="7" weight="medium">
          {formatedValue}
          <span style={{ fontSize: '.825rem' }}>TIG</span>
        </Text>
      ),
      [IUnit.TIG_PER_HOUR]: (
        <Text as="p" size="7" weight="medium">
          {formatedValue}
          <span style={{ fontSize: '.825rem' }}>TIG/h</span>
        </Text>
      ),
    };
    return map[unit];
  };

  return { getValue };
};
