import { IChartContainer } from '@/types/IChartContainer/IChartContainer';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import BarChart from '../BarChart/BarChart';
import { IChartType } from '@/types/IChartType.ts/IChartType';
import LineChart from '../LineChart/LineChart';
import { ChartData } from 'chart.js';

const ChartContainer = (props: IChartContainer) => {
  return (
    <Box width="100%">
      <Card size="4">
        <Flex gap="3" align="center" mb="7">
          <Box>
            <Text as="p" size="6" weight="medium" mb="1">
              {props.title}
            </Text>
            <Text as="p" size="2" color="gray">
              {props.description}
            </Text>
          </Box>
        </Flex>
        <Flex
          align={'center'}
          justify={'start'}
          gapX={'8'}
          gapY={'6'}
          wrap={'wrap'}
        >
          {props.type === IChartType.BAR && (
            <BarChart data={props.data as ChartData<'bar', number[], string>} />
          )}
          {props.type === IChartType.LINE && (
            <LineChart
              data={props.data as ChartData<'line', number[], string>}
            />
          )}
        </Flex>
      </Card>
    </Box>
  );
};

export default ChartContainer;
