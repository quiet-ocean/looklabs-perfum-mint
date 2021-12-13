import { useAppState } from '../state'

export const fetcherMetadata = async (url: string) => {
  try {
    return await (await fetch(url)).json()
  } catch (e) {
    // return { error: e?.message }
    return e
  }
}

export const fetchOwner = async (id: string) => {
  try {
    const { contract } = useAppState.getState()
    if (!contract) throw new Error('Contract not found')

    return await contract?.ownerOf(id)
  } catch (e) {
    // return { error: e?.message }
    return e
  }
}
