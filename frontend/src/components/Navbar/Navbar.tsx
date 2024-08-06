'use client';
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Separator,
  Text,
} from '@radix-ui/themes';
import React from 'react';
import { useNavbar } from './Navbar.logic';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const logic = useNavbar();
  const pathname = usePathname();

  return (
    <>
      <Box p="0">
        <nav>
          <Flex justify="between" p="2">
            <Flex
              style={{ minWidth: '100px' }}
              justify="between"
              align="center"
            >
              <Text weight="bold">TIG Explorer</Text>
            </Flex>
            <Flex justify="between" align="center">
              <Link href="/">
                <Badge
                  color="gray"
                  variant={pathname === '/' ? 'solid' : 'soft'}
                  size="3"
                  radius="full"
                  highContrast
                >
                  Overview
                </Badge>
              </Link>
            </Flex>
            <Flex justify="between" align="center">
              <Text weight="regular">
                TIG Value:{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {Number(logic.tigPrice).toFixed(2)}$
                </span>
              </Text>
              <IconButton ml="2" onClick={logic.openDollarDialog}>
                <Pencil2Icon width="15" height="15" />
              </IconButton>
            </Flex>
          </Flex>
        </nav>
      </Box>
    </>
  );
};

export default Navbar;
