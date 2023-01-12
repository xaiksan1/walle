import { Box, Text } from 'ink'
import React from 'react'
import { Menu, MenuItem } from '@components'
import { ROUTE, useNavigate } from '@routes'
import { COLUMNS, useWalletConnectStore, useWalletStore } from '@store'
import { useSelectionZone } from '@src/components/SelectionZone'
import { signClient } from '@src/wallet-connect'

export const MainMenu: React.FC = () => {
  const navigate = useNavigate()
  const parentZone = useSelectionZone()!

  const logout = useWalletStore((state) => state.logout)
  const disconnect = useWalletConnectStore((store) => store.disconnect)
  const pendingRequests = useWalletConnectStore((store) => store.requests)
  const connected = useWalletConnectStore((store) => store.connected())

  const menuItems: MenuItem[] = [
    {
      title: 'Home',
      onSelect: () => {
        navigate(ROUTE.WALLET)
        parentZone.select(COLUMNS.MAIN)
      },
    },
    {
      title: 'Wallet',
      items: [
        {
          title: 'Switch chain',
          onSelect: () => {
            navigate(ROUTE.SWITCH_CHAIN)
            parentZone.select(COLUMNS.MAIN)
          },
        },
        {
          title: 'Switch account',
          onSelect: () => {
            navigate(ROUTE.SWITCH_ACCOUNT)
            parentZone.select(COLUMNS.MAIN)
          },
        },
        {
          title: 'Add token',
          onSelect: () => {
            navigate(ROUTE.TOKEN_ADD)
            parentZone.select(COLUMNS.MAIN)
          },
        },
      ],
    },
    {
      title: 'Security',
      onSelect: () => {
        navigate(ROUTE.SECURITY)
        parentZone.select(COLUMNS.MAIN)
      },
    },
    {
      title: 'Logout',
      onSelect: () => {
        logout()
        navigate(ROUTE.REGISTRATION)
      },
    },
    {
      title: 'Lock',
      onSelect: () => navigate(ROUTE.LOGIN),
    },
    connected
      ? {
          title: 'WalletConnect',
          items: [
            {
              title: 'Active session',
              onSelect: () => {
                navigate(ROUTE.WALLET_CONNECT, {})
                parentZone.select(COLUMNS.MAIN)
              },
            },
            {
              title: 'Pairings',
              onSelect: () => {
                navigate(ROUTE.WALLET_CONNECT_PAIRINGS)
                parentZone.select(COLUMNS.MAIN)
              },
            },
            {
              title: pendingRequests.length
                ? `Pending requests (${pendingRequests.length})`
                : 'Pending requests',
              onSelect: () => {
                navigate(ROUTE.WALLET_CONNECT_REQUESTS)
                parentZone.select(COLUMNS.MAIN)
              },
            },
            {
              title: 'Disconnect',
              onSelect: () => {
                const session = signClient.session.values[0]
                disconnect(session.topic)
                parentZone.select(COLUMNS.MAIN)
              },
            },
          ],
        }
      : {
          title: 'WalletConnect',
          onSelect: () => {
            navigate(ROUTE.WALLET_CONNECT, {})
            parentZone.select(COLUMNS.MAIN)
          },
        },
    {
      title: 'FAQ',
      onSelect: () => console.log('WIP'),
    },
  ]

  return (
    <>
      <Box alignSelf="center" marginTop={-1}>
        <Text bold> Menu </Text>
      </Box>
      <Menu
        isActive={parentZone.selection === COLUMNS.MENU}
        items={menuItems}
        prevKey="upArrow"
        nextKey="downArrow"
      />
    </>
  )
}
