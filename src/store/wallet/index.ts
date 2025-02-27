import { Nullable } from 'tsdef'

import { Wallet } from '@ethersproject/wallet'
import { getDerivationPath } from '@src/utils'

import { createWithSubscribeSelector } from '../createWithSubscribeSelector'
import { Action } from '..'

import {
  createAccount,
  decryptWallet,
  deleteAccount,
  deriveMnemonicAddress,
  encryptWallet,
  generateWallet,
  importWallet,
  logout,
} from './actions'

export interface Account {
  name: string
  pathId: number
}

export interface WalletStore {
  pathId: number
  phrase: Nullable<string>
  accounts: Account[]
  getWallet: (pathId?: number) => Wallet
  generateWallet: () => void
  importWallet: (mnemonic: string) => void
  deriveMnemonicAddress: () => void
  encryptWallet: (password: string) => Promise<string>
  decryptWallet: (password: string, encryptedWallet: string) => Promise<void>
  logout: () => void
  createAccount: (name: string, accountId?: number) => void
  deleteAccount: (accountId: number) => void
  selectAccount: (accountIndex: number) => void
}

export type WalletAction<T extends keyof WalletStore> = Action<
  WalletStore,
  WalletStore[T]
>

export const useWalletStore = createWithSubscribeSelector<WalletStore>(
  (set, get) => ({
    pathId: 0,
    phrase: null,
    accounts: [
      {
        name: 'Main',
        pathId: 0,
      },
    ],
    getWallet: (defaultPathId?: number) => {
      const { phrase, pathId } = get()

      if (!phrase) {
        throw new Error('Phrase is null')
      }

      return Wallet.fromMnemonic(
        phrase!,
        getDerivationPath(defaultPathId ?? pathId),
      )
    },
    generateWallet: generateWallet(set, get),
    importWallet: importWallet(set, get),
    deriveMnemonicAddress: deriveMnemonicAddress(set, get),
    encryptWallet: encryptWallet(set, get),
    decryptWallet: decryptWallet(set, get),
    logout: logout(set, get),
    createAccount: createAccount(set, get),
    deleteAccount: deleteAccount(set, get),
    selectAccount: (accountId: number) => {
      set({ pathId: accountId })
    },
  }),
)
