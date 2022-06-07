import { TokensAction } from '.'

export const syncBalances: TokensAction<'syncBalances'> =
  (set, get) => async () => {
    const { tokens } = get()
    const balances = new Map()

    set({ balancesIsLoading: true })

    // TODO: load real balances
    await new Promise((resolve) => setTimeout(resolve, 5000))

    tokens.forEach((token) => {
      balances.set(token.address, '1000')
    })

    set({ balances })
    set({ balancesIsLoading: false })
  }
