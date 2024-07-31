'use client';
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Separator,
  Text,
} from '@radix-ui/themes';
import React, { useState } from 'react';
import { useNavbar } from './Navbar.logic';
import { MagnifyingGlassIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const logic = useNavbar();
  const pathname = usePathname();

  return (
    <Box p="0">
      <nav>
        <Flex justify="between" p="1">
          <Flex style={{ minWidth: '100px' }} justify="between" align="center">
            <Text weight="bold">TIG Explorer</Text>
            <Separator orientation="vertical" size="2" />
          </Flex>
          <Flex justify="between" align="center">
            <Badge
              color="gray"
              variant={pathname === '/' ? 'solid' : 'soft'}
              size="3"
              radius="full"
              highContrast
            >
              All Nodes
            </Badge>
          </Flex>
          <Flex justify="between" align="center">
            <Text weight="regular">
              TIG Value:{' '}
              <span style={{ fontWeight: 'bold' }}>{logic.tigValue}$</span>
            </Text>
            <IconButton ml="2">
              <Pencil2Icon width="15" height="15" />
            </IconButton>
          </Flex>
        </Flex>
        <Separator my="2" size="4" />
      </nav>
    </Box>
  );
};

export default Navbar;
