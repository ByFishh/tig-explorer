'use client';
import {
  Box,
  Flex,
  Card,
  Text,
  TextArea,
  Button,
  Grid,
  TextField,
} from '@radix-ui/themes';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import DatePicker from '../DatePicker/DatePicker';
import { Controller } from 'react-hook-form';
import { useConfigure } from './Configure.logic';

const Configure = () => {
  const logic = useConfigure();
  return (
    <Box maxWidth="500px" width="100%">
      <Card size="4">
        <Flex gap="3" align="center" mb="7">
          <Box>
            <Text as="p" size="6" weight="medium" mb="1">
              Configure Node
            </Text>
            <Text as="p" size="2" color="gray">
              Setup all personnal datas relative to your node
            </Text>
          </Box>
        </Flex>
        <Flex width={'100%'} style={{ flexFlow: 'column' }}>
          <Controller
            name="notes"
            control={logic.control}
            rules={{ maxLength: 100 }}
            render={({ field }) => (
              <>
                <Flex align={'center'} justify={'between'}>
                  <Text as="label" size="2" weight="medium" mb="1">
                    Notes (optional)
                  </Text>
                  <Text as="span" size="2" weight="medium" mb="1">
                    {field.value ? field.value.length : 0}/100
                  </Text>
                </Flex>
                <TextArea
                  maxLength={100}
                  style={{ width: '100%' }}
                  mb="4"
                  onChange={field.onChange}
                />
              </>
            )}
          ></Controller>
        </Flex>
        <Flex mt="4" style={{ flexFlow: 'column' }}>
          <Box mb="5">
            <Text as="p" size="6" weight="medium" mb="1">
              Personnal server
            </Text>
            <Text as="p" size="2" color="gray">
              Setup all personnal datas relative to your node
            </Text>
          </Box>
          <Grid columns="2" gap="6">
            <Flex width="100%" style={{ flexFlow: 'column' }} mb="4">
              <Text as="label" size="2" weight="regular" mb="1" color="gray">
                Start date (optional)
              </Text>
              <Controller
                name="startDate"
                control={logic.control}
                render={({ field }) => <DatePicker onChange={field.onChange} />}
              ></Controller>
            </Flex>
            <Flex width="100%" style={{ flexFlow: 'column' }}>
              <Text as="label" size="2" weight="regular" mb="1" color="gray">
                Core number (optional)
              </Text>
              <Box maxWidth="250px">
                <Controller
                  name="coreNumber"
                  control={logic.control}
                  render={({ field }) => (
                    <TextField.Root
                      size="3"
                      type="number"
                      onChange={field.onChange}
                    />
                  )}
                ></Controller>
              </Box>
            </Flex>
          </Grid>
          <Flex width="100%" style={{ flexFlow: 'column' }}>
            <Text as="label" size="2" weight="regular" mb="1" color="gray">
              Server cost (optional)
            </Text>
            <Box mb="4">
              <Controller
                name="serverCost"
                control={logic.control}
                render={({ field }) => (
                  <TextField.Root
                    size="3"
                    type="number"
                    style={{ paddingLeft: '0' }}
                    onChange={field.onChange}
                  >
                    <TextField.Slot
                      style={{ paddingLeft: '0' }}
                    ></TextField.Slot>
                    <TextField.Slot>
                      <Text as="label" size="2" weight="regular" color="gray">
                        $/month
                      </Text>
                    </TextField.Slot>
                  </TextField.Root>
                )}
              ></Controller>
            </Box>
            <Flex justify={'end'}>
              <Box>
                <Button onClick={logic.handleSubmit(logic.onSubmit)}>
                  <ArrowTopRightIcon /> Set
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};

export default Configure;
