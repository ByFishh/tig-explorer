import { useNodesData } from '@/hooks/useNodesData';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { ICard } from '@/types/ICard/ICard';
import { IUnit } from '@/types/IUnit/IUnit';
import { convertUnit } from '@/utils/convertUnit';
import { getCostPerTig } from '@/utils/getCostPerTig';
import { Flex, Text } from '@radix-ui/themes';

export const useOverviewCards = () => {
  const { validNodesInformation, getNodes } = useNodesData();
  const { tigPrice } = useTigPrice();

  const items: ICard[] = [
    {
      title: 'Total',
      description: 'Review here total informations relative to your node(s)',
      data: [],
      content: (
        <>
          <Flex style={{ flexFlow: 'column' }}>
            <Text as="p" size="2" mb="0" color="gray">
              Total earned ({IUnit.TIG})
            </Text>
            <Text as="p" size="7" weight="medium">
              {Number(validNodesInformation.totalEarned).toFixed(2)}
              <span style={{ fontSize: '.825rem' }}>{IUnit.TIG}</span>
            </Text>
          </Flex>
          <Flex style={{ flexFlow: 'column' }}>
            <Text as="p" size="2" mb="0" color="gray">
              Total earned ({IUnit.DOLLARD})
            </Text>
            <Text as="p" size="7" weight="medium">
              <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
              {Number(
                convertUnit(validNodesInformation.totalEarned, tigPrice),
              ).toFixed(2)}
            </Text>
          </Flex>
          {!!validNodesInformation.allHaveStartDate ? (
            <Flex style={{ flexFlow: 'column' }}>
              <Text as="p" size="2" mb="0" color="gray">
                Average earned ({IUnit.TIG_PER_HOUR})
              </Text>
              <Text as="p" size="7" weight="medium">
                {Number(validNodesInformation.getTigEanedSinceStart).toFixed(2)}
                <span style={{ fontSize: '.825rem' }}>
                  {IUnit.TIG_PER_HOUR}
                </span>
              </Text>
            </Flex>
          ) : (
            <Text size="2" color="red" mr="3">
              You need to enter a{' '}
              <span style={{ textDecoration: 'underline' }}>Start date</span> on
              ALL your valid nodes before you can access this data.
            </Text>
          )}
          {!!validNodesInformation.allHaveStartDate &&
          !!validNodesInformation.allAreConfigured ? (
            <Flex style={{ flexFlow: 'column' }}>
              <Text as="p" size="2" mb="0" color="gray">
                Cost per Tig ({IUnit.DOLLARD})
              </Text>
              <Text as="p" size="7" weight="medium">
                <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
                {Number(
                  validNodesInformation.costSinceStart / getNodes.valid.length,
                ).toFixed(2)}
              </Text>
            </Flex>
          ) : (
            <Text size="2" color="red" mr="3">
              You need to enter a{' '}
              <span style={{ textDecoration: 'underline' }}>Start date</span>{' '}
              and{' '}
              <span style={{ textDecoration: 'underline' }}>Server cost</span>{' '}
              on ALL your valid nodes before you can access this data.
            </Text>
          )}
        </>
      ),
    },

    {
      title: 'Last 2 hours',
      description:
        'Review here the last 2 hours informations relative to your node(s)',
      data: [],
      content: (
        <>
          <Flex style={{ flexFlow: 'column' }}>
            <Text as="p" size="2" mb="0" color="gray">
              Average earned ({IUnit.TIG_PER_HOUR})
            </Text>
            <Text as="p" size="7" weight="medium">
              {Number(validNodesInformation.averageEarned).toFixed(2)}
              <span style={{ fontSize: '.825rem' }}>{IUnit.TIG_PER_HOUR}</span>
            </Text>
          </Flex>
          {!!validNodesInformation.allAreConfigured ? (
            <Flex style={{ flexFlow: 'column' }}>
              <Text as="p" size="2" mb="0" color="gray">
                Cost per Tig ({IUnit.DOLLARD})
              </Text>
              <Text as="p" size="7" weight="medium">
                <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
                {Number(
                  getCostPerTig(
                    validNodesInformation.allServerCost,
                    validNodesInformation.averageEarned,
                  ),
                ).toFixed(2)}
              </Text>
            </Flex>
          ) : (
            <Text size="2" color="red" mr="3">
              You need to enter a{' '}
              <span style={{ textDecoration: 'underline' }}>Server cost</span>{' '}
              on ALL your valid nodes before you can access this data.
            </Text>
          )}
        </>
      ),
    },
  ];

  return { getNodes, items };
};
