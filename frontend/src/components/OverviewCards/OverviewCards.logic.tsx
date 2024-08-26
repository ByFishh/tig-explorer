import { useBenchmarkersData } from '@/hooks/useBenchmarkersData';
import { useTigPrice } from '@/store/tigPriceReducer/tigPriceReducer';
import { ICard } from '@/types/ICard/ICard';
import { IUnit } from '@/types/IUnit/IUnit';
import { convertUnit } from '@/utils/convertUnit';
import { getCostPerTig } from '@/utils/getCostPerTig';
import { Flex, Text } from '@radix-ui/themes';

export const useOverviewCards = () => {
  const { validBenchmarkersInformation, getBenchmarkers } =
    useBenchmarkersData();
  const { tigPrice } = useTigPrice();

  const items: ICard[] = [
    {
      title: 'Total',
      description: 'Review here total informations relative to your benchmarker(s)',
      data: [],
      content: (
        <>
          <Flex style={{ flexFlow: 'column' }}>
            <Text as="p" size="2" mb="0" color="gray">
              Total earned ({IUnit.TIG})
            </Text>
            <Text as="p" size="7" weight="medium">
              {Number(validBenchmarkersInformation.totalEarned).toFixed(2)}
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
                convertUnit(validBenchmarkersInformation.totalEarned, tigPrice),
              ).toFixed(2)}
            </Text>
          </Flex>
          {!!validBenchmarkersInformation.allHaveStartDate ? (
            <Flex style={{ flexFlow: 'column' }}>
              <Text as="p" size="2" mb="0" color="gray">
                Average earned ({IUnit.TIG_PER_HOUR})
              </Text>
              <Text as="p" size="7" weight="medium">
                {Number(
                  validBenchmarkersInformation.getTigEanedSinceStart,
                ).toFixed(2)}
                <span style={{ fontSize: '.825rem' }}>
                  {IUnit.TIG_PER_HOUR}
                </span>
              </Text>
            </Flex>
          ) : (
            <Text size="2" color="red" mr="3">
              You need to enter a{' '}
              <span style={{ textDecoration: 'underline' }}>Start date</span> on
              ALL your valid benchmarkers before you can access this data.
            </Text>
          )}
          {!!validBenchmarkersInformation.allHaveStartDate &&
          !!validBenchmarkersInformation.allAreConfigured ? (
            <Flex style={{ flexFlow: 'column' }}>
              <Text as="p" size="2" mb="0" color="gray">
                Cost per Tig ({IUnit.DOLLARD})
              </Text>
              <Text as="p" size="7" weight="medium">
                <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
                {Number(
                  validBenchmarkersInformation.costSinceStart /
                    getBenchmarkers.valid.length,
                ).toFixed(2)}
              </Text>
            </Flex>
          ) : (
            <Text size="2" color="red" mr="3">
              You need to enter a{' '}
              <span style={{ textDecoration: 'underline' }}>Start date</span>{' '}
              and{' '}
              <span style={{ textDecoration: 'underline' }}>Server cost</span>{' '}
              on ALL your valid benchmarkers before you can access this data.
            </Text>
          )}
        </>
      ),
    },

    {
      title: 'Last 2 hours',
      description:
        'Review here the last 2 hours informations relative to your benchmarker(s)',
      data: [],
      content: (
        <>
          <Flex style={{ flexFlow: 'column' }}>
            <Text as="p" size="2" mb="0" color="gray">
              Average earned ({IUnit.TIG_PER_HOUR})
            </Text>
            <Text as="p" size="7" weight="medium">
              {Number(validBenchmarkersInformation.averageEarned).toFixed(2)}
              <span style={{ fontSize: '.825rem' }}>{IUnit.TIG_PER_HOUR}</span>
            </Text>
          </Flex>
          {!!validBenchmarkersInformation.allAreConfigured ? (
            <Flex style={{ flexFlow: 'column' }}>
              <Text as="p" size="2" mb="0" color="gray">
                Cost per Tig ({IUnit.DOLLARD})
              </Text>
              <Text as="p" size="7" weight="medium">
                <span style={{ fontSize: '.825rem' }}>{IUnit.DOLLARD}</span>
                {Number(
                  getCostPerTig(
                    validBenchmarkersInformation.allServerCost,
                    validBenchmarkersInformation.averageEarned,
                  ),
                ).toFixed(2)}
              </Text>
            </Flex>
          ) : (
            <Text size="2" color="red" mr="3">
              You need to enter a{' '}
              <span style={{ textDecoration: 'underline' }}>Server cost</span>{' '}
              on ALL your valid benchmarkers before you can access this data.
            </Text>
          )}
        </>
      ),
    },
  ];

  return { getBenchmarkers, items };
};
